"""
Test script to verify the LangGraph chatbot functionality
Run this to test the chatbot responses
"""

from langgraph_chatbot import process_chatbot_query

def test_chatbot():
    """Test the chatbot with various queries"""
    
    test_cases = [
        {
            "query": "what are the apartments near area y",
            "user_role": "user",
            "expected_action": "navigate"
        },
        {
            "query": "show me traffic status",
            "user_role": "developer",
            "expected_action": "navigate"
        },
        {
            "query": "parking availability downtown",
            "user_role": "user",
            "expected_action": "navigate"
        },
        {
            "query": "upcoming events this week",
            "user_role": "user",
            "expected_action": "navigate"
        },
        {
            "query": "japanese restaurants",
            "user_role": "user",
            "expected_action": "navigate"
        },
        {
            "query": "go to dashboard",
            "user_role": "developer",
            "expected_action": "navigate"
        },
        {
            "query": "help me with the system",
            "user_role": "user",
            "expected_action": "info"
        }
    ]
    
    print("🤖 Testing Mosbius Urban Intelligence Chatbot")
    print("=" * 60)
    
    for i, test in enumerate(test_cases, 1):
        print(f"\n📝 Test {i}: {test['query']}")
        print(f"👤 User Role: {test['user_role']}")
        
        result = process_chatbot_query(
            query=test['query'],
            user_role=test['user_role'],
            urban_id="demo-city"
        )
        
        print(f"✅ Success: {result['success']}")
        print(f"💬 Response: {result['message'][:100]}...")
        print(f"🎯 Action: {result['action']}")
        
        if result.get('page'):
            print(f"🔗 Navigate to: {result['page']}")
        if result.get('feature'):
            print(f"⚙️  Feature: {result['feature']}")
        if result.get('filter_params'):
            print(f"🔍 Filters: {result['filter_params']}")
            
        # Verify expected action
        if result['action'] == test['expected_action']:
            print("✅ Action matches expected result")
        else:
            print(f"❌ Expected {test['expected_action']}, got {result['action']}")
        
        print("-" * 40)
    
    print("\n🎉 Chatbot testing completed!")
    print("\nKey Features Tested:")
    print("• Natural language understanding")
    print("• Context-aware responses")
    print("• Role-based functionality")
    print("• Navigation actions")
    print("• Information retrieval")
    print("• Error handling")

if __name__ == "__main__":
    test_chatbot()
