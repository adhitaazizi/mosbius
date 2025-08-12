"""
LangGraph-based chatbot for Mosbius Urban Intelligence System
Handles user queries and can trigger navigation actions
"""

import json
import re
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from enum import Enum

class ActionType(Enum):
    NAVIGATE = "navigate"
    INFO = "info"
    SEARCH = "search"
    FILTER = "filter"

@dataclass
class ChatbotResponse:
    message: str
    action: ActionType
    page: Optional[str] = None
    feature: Optional[str] = None
    filter_params: Optional[Dict[str, Any]] = None
    data: Optional[Dict[str, Any]] = None

class UrbanIntelligenceAgent:
    def __init__(self):
        self.city_data = {
            "living": {
                "areas": ["area-y", "area-z", "area-x", "downtown", "tech-quarter", "green-district"],
                "types": ["apartment", "condo", "house", "loft", "studio"],
                "sample_data": [
                    {"name": "Skyline Apartments", "area": "area-y", "type": "apartment", "price": "$2,800/month"},
                    {"name": "Green Valley Condos", "area": "area-z", "type": "condo", "price": "$2,200/month"},
                    {"name": "Tech Quarter Lofts", "area": "area-x", "type": "loft", "price": "$3,200/month"}
                ]
            },
            "traffic": {
                "status": "moderate",
                "congestion_level": 68,
                "hotspots": ["Highway 101", "Downtown Core", "Tech Quarter Bridge"]
            },
            "parking": {
                "availability": "34% occupied",
                "zones": ["Downtown Core", "Shopping District", "Business Quarter"]
            },
            "events": {
                "upcoming": ["Tech Innovation Summit", "Urban Green Festival", "Cultural Heritage Night"]
            },
            "food": {
                "cuisines": ["fusion", "japanese", "organic"],
                "restaurants": ["Quantum Bistro", "Neon Noodle House", "Vertical Farm Cafe"]
            },
            "entertainment": {
                "venues": ["Holographic Cinema", "Neon Arcade", "Sky Lounge"]
            },
            "health": {
                "facilities": ["Central Medical Complex", "Wellness Center", "Digital Pharmacy"]
            },
            "sport": {
                "facilities": ["Quantum Sports Complex", "Cyber Stadium", "Climbing Center"]
            },
            "community": {
                "centers": ["Digital Community Center", "Makers' Collective", "Green Community Garden"]
            }
        }
        
        self.intent_patterns = {
            "living_search": [
                r"apartments?\s+(?:near|in|at)\s+(\w+(?:\s+\w+)*)",
                r"housing?\s+(?:near|in|at)\s+(\w+(?:\s+\w+)*)",
                r"(?:find|show|search)\s+(?:apartments?|housing?|living)",
                r"where\s+(?:can\s+i\s+)?live\s+(?:near|in)\s+(\w+(?:\s+\w+)*)"
            ],
            "traffic_query": [
                r"traffic\s+(?:status|condition|situation)",
                r"how\s+is\s+(?:the\s+)?traffic",
                r"congestion\s+(?:level|status)",
                r"road\s+conditions?"
            ],
            "parking_query": [
                r"parking\s+(?:availability|spaces?|spots?)",
                r"where\s+(?:can\s+i\s+)?park",
                r"find\s+parking",
                r"parking\s+(?:near|in|at)\s+(\w+(?:\s+\w+)*)"
            ],
            "events_query": [
                r"events?\s+(?:today|tomorrow|upcoming|this\s+week)",
                r"what\s+(?:events?|activities)\s+are\s+(?:happening|available)",
                r"show\s+(?:me\s+)?events?"
            ],
            "food_query": [
                r"restaurants?\s+(?:near|in|at)\s+(\w+(?:\s+\w+)*)",
                r"(?:find|show)\s+(?:food|restaurants?|dining)",
                r"where\s+(?:can\s+i\s+)?eat",
                r"(\w+)\s+(?:food|cuisine|restaurants?)"
            ],
            "navigation": [
                r"go\s+to\s+(\w+(?:\s+\w+)*)",
                r"navigate\s+to\s+(\w+(?:\s+\w+)*)",
                r"show\s+(?:me\s+)?(?:the\s+)?(\w+)\s+page",
                r"open\s+(\w+(?:\s+\w+)*)"
            ]
        }

    def process_query(self, query: str, user_role: str = "user", urban_id: str = "demo-city") -> ChatbotResponse:
        """Process user query and return appropriate response with actions"""
        query_lower = query.lower().strip()
        
        # Check for living/housing queries
        for pattern in self.intent_patterns["living_search"]:
            match = re.search(pattern, query_lower)
            if match:
                area = match.group(1) if match.groups() else None
                return self._handle_living_query(area, urban_id)
        
        # Check for traffic queries
        for pattern in self.intent_patterns["traffic_query"]:
            if re.search(pattern, query_lower):
                return self._handle_traffic_query(user_role, urban_id)
        
        # Check for parking queries
        for pattern in self.intent_patterns["parking_query"]:
            match = re.search(pattern, query_lower)
            if match:
                area = match.group(1) if match.groups() else None
                return self._handle_parking_query(area, user_role, urban_id)
        
        # Check for events queries
        for pattern in self.intent_patterns["events_query"]:
            if re.search(pattern, query_lower):
                return self._handle_events_query(urban_id)
        
        # Check for food queries
        for pattern in self.intent_patterns["food_query"]:
            match = re.search(pattern, query_lower)
            if match:
                cuisine_or_area = match.group(1) if match.groups() else None
                return self._handle_food_query(cuisine_or_area, urban_id)
        
        # Check for direct navigation
        for pattern in self.intent_patterns["navigation"]:
            match = re.search(pattern, query_lower)
            if match:
                destination = match.group(1)
                return self._handle_navigation(destination, urban_id)
        
        # Default response with general help
        return self._handle_general_query(query_lower, user_role)

    def _handle_living_query(self, area: Optional[str], urban_id: str) -> ChatbotResponse:
        """Handle queries about apartments and housing"""
        if area:
            # Normalize area name
            area_normalized = area.lower().replace(" ", "-")
            
            # Find matching apartments
            matching_apartments = [
                apt for apt in self.city_data["living"]["sample_data"]
                if area_normalized in apt["area"].lower() or area.lower() in apt["area"].lower()
            ]
            
            if matching_apartments:
                apt_list = ", ".join([f"{apt['name']} ({apt['price']})" for apt in matching_apartments])
                message = f"I found {len(matching_apartments)} apartments near {area}: {apt_list}. Let me show you the living page with detailed information."
            else:
                message = f"I'm searching for apartments near {area}. Let me take you to the living page to explore all available options."
            
            return ChatbotResponse(
                message=message,
                action=ActionType.NAVIGATE,
                page=f"/urban/{urban_id}/living",
                filter_params={"area": area_normalized}
            )
        else:
            return ChatbotResponse(
                message="I'll show you all available housing options in the city.",
                action=ActionType.NAVIGATE,
                page=f"/urban/{urban_id}/living"
            )

    def _handle_traffic_query(self, user_role: str, urban_id: str) -> ChatbotResponse:
        """Handle traffic-related queries"""
        traffic_info = self.city_data["traffic"]
        message = f"Current traffic status is {traffic_info['status']} with {traffic_info['congestion_level']}% congestion level. "
        
        if traffic_info["hotspots"]:
            message += f"Main congestion areas: {', '.join(traffic_info['hotspots'])}. "
        
        if user_role == "developer":
            message += "I can show you the detailed traffic analysis dashboard."
            return ChatbotResponse(
                message=message,
                action=ActionType.NAVIGATE,
                page=f"/urban/{urban_id}/dashboard",
                feature="traffic-analysis"
            )
        else:
            message += "Would you like to see the urban view for more details?"
            return ChatbotResponse(
                message=message,
                action=ActionType.INFO,
                data=traffic_info
            )

    def _handle_parking_query(self, area: Optional[str], user_role: str, urban_id: str) -> ChatbotResponse:
        """Handle parking availability queries"""
        parking_info = self.city_data["parking"]
        
        if area:
            message = f"Checking parking availability near {area}. Current city-wide availability: {parking_info['availability']}. "
        else:
            message = f"Current parking availability: {parking_info['availability']}. "
        
        message += f"Available zones: {', '.join(parking_info['zones'])}. "
        
        if user_role == "developer":
            message += "I can show you the detailed parking analysis dashboard."
            return ChatbotResponse(
                message=message,
                action=ActionType.NAVIGATE,
                page=f"/urban/{urban_id}/dashboard",
                feature="parking-analysis"
            )
        else:
            message += "Let me show you the urban view for real-time parking information."
            return ChatbotResponse(
                message=message,
                action=ActionType.NAVIGATE,
                page=f"/urban/{urban_id}/dashboard",
                feature="urban-view"
            )

    def _handle_events_query(self, urban_id: str) -> ChatbotResponse:
        """Handle events and activities queries"""
        events = self.city_data["events"]["upcoming"]
        message = f"Upcoming events in the city: {', '.join(events)}. Let me show you the events page for detailed information."
        
        return ChatbotResponse(
            message=message,
            action=ActionType.NAVIGATE,
            page=f"/urban/{urban_id}/event"
        )

    def _handle_food_query(self, cuisine_or_area: Optional[str], urban_id: str) -> ChatbotResponse:
        """Handle food and restaurant queries"""
        restaurants = self.city_data["food"]["restaurants"]
        
        if cuisine_or_area:
            message = f"Looking for {cuisine_or_area} options. Popular restaurants include: {', '.join(restaurants)}. "
        else:
            message = f"Popular restaurants in the city: {', '.join(restaurants)}. "
        
        message += "Let me show you the food page for detailed information and locations."
        
        return ChatbotResponse(
            message=message,
            action=ActionType.NAVIGATE,
            page=f"/urban/{urban_id}/food",
            filter_params={"cuisine": cuisine_or_area} if cuisine_or_area else None
        )

    def _handle_navigation(self, destination: str, urban_id: str) -> ChatbotResponse:
        """Handle direct navigation requests"""
        # Map common destination names to actual pages
        page_mapping = {
            "dashboard": f"/urban/{urban_id}/dashboard",
            "living": f"/urban/{urban_id}/living",
            "housing": f"/urban/{urban_id}/living",
            "apartments": f"/urban/{urban_id}/living",
            "events": f"/urban/{urban_id}/event",
            "food": f"/urban/{urban_id}/food",
            "restaurants": f"/urban/{urban_id}/food",
            "dining": f"/urban/{urban_id}/food",
            "entertainment": f"/urban/{urban_id}/entertainment",
            "health": f"/urban/{urban_id}/health",
            "medical": f"/urban/{urban_id}/health",
            "sports": f"/urban/{urban_id}/sport",
            "fitness": f"/urban/{urban_id}/sport",
            "community": f"/urban/{urban_id}/community",
            "wellness": f"/urban/{urban_id}/reflexing",
            "meditation": f"/urban/{urban_id}/reflexing",
            "networks": "/networks"
        }
        
        destination_key = destination.lower().replace(" ", "")
        page = page_mapping.get(destination_key)
        
        if page:
            return ChatbotResponse(
                message=f"Taking you to the {destination} page.",
                action=ActionType.NAVIGATE,
                page=page
            )
        else:
            return ChatbotResponse(
                message=f"I'm not sure how to navigate to '{destination}'. Try asking about specific services like 'apartments', 'events', 'food', or 'dashboard'.",
                action=ActionType.INFO
            )

    def _handle_general_query(self, query: str, user_role: str) -> ChatbotResponse:
        """Handle general queries and provide help"""
        help_message = """I'm your urban intelligence assistant! I can help you with:

🏠 **Housing**: "apartments near area Y", "find housing"
🚗 **Traffic**: "traffic status", "road conditions"  
🅿️ **Parking**: "parking availability", "find parking"
📅 **Events**: "upcoming events", "what's happening"
🍽️ **Food**: "restaurants near downtown", "japanese food"
🎯 **Navigation**: "go to dashboard", "show events page"

I can also navigate you directly to different sections of the city system. What would you like to know about?"""
        
        return ChatbotResponse(
            message=help_message,
            action=ActionType.INFO
        )

# Initialize the agent
agent = UrbanIntelligenceAgent()

def process_chatbot_query(query: str, user_role: str = "user", urban_id: str = "demo-city") -> dict:
    """Main function to process chatbot queries"""
    try:
        response = agent.process_query(query, user_role, urban_id)
        
        return {
            "success": True,
            "message": response.message,
            "action": response.action.value,
            "page": response.page,
            "feature": response.feature,
            "filter_params": response.filter_params,
            "data": response.data
        }
    except Exception as e:
        return {
            "success": False,
            "message": f"I encountered an error processing your request: {str(e)}. Please try again.",
            "action": "info"
        }

# Test the chatbot
if __name__ == "__main__":
    # Test queries
    test_queries = [
        "what are the apartments near area y",
        "show traffic status",
        "parking availability downtown",
        "upcoming events",
        "japanese restaurants",
        "go to dashboard",
        "help me"
    ]
    
    print("Testing Urban Intelligence Chatbot:")
    print("=" * 50)
    
    for query in test_queries:
        print(f"\nQuery: {query}")
        result = process_chatbot_query(query, "user", "demo-city")
        print(f"Response: {result['message']}")
        print(f"Action: {result['action']}")
        if result.get('page'):
            print(f"Navigate to: {result['page']}")
        if result.get('feature'):
            print(f"Feature: {result['feature']}")
        print("-" * 30)
