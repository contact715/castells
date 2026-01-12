import time

class MockLangGraphAgent:
    """
    Mock Service: Simulates a LangGraph state machine for autonomous lead nurturing.
    Transitions between SMS -> Email -> Voice Drop based on lead behavior.
    """
    def __init__(self, lead_id: int):
        self.lead_id = lead_id
        self.state = "START"
        self.history = []
        
    def run_next_step(self, last_action: str = None):
        """
        Determines the next best action based on mock state logic.
        """
        time.sleep(1) # Simulate LLM 'Thinking'
        
        response = {}
        
        if self.state == "START":
            self.state = "SMS_SENT"
            response = {
                "action": "SEND_SMS",
                "channel": "SMS",
                "content": "Hi! Thanks for requesting a quote. When is a good time to chat?",
                "reasoning": "Initial outreach preference: High open rate channel."
            }
        elif self.state == "SMS_SENT":
            if last_action == "NO_REPLY":
                self.state = "EMAIL_SENT"
                response = {
                    "action": "SEND_EMAIL",
                    "channel": "EMAIL",
                    "content": "Subject: Your Estimate. Body: Just following up on your request...",
                    "reasoning": "No reply to SMS after 24h. Switching channel to Email."
                }
            elif last_action == "REPLIED":
                self.state = "HANDOFF"
                response = {
                    "action": "NOTIFY_HUMAN",
                    "channel": "INTERNAL",
                    "content": "Lead replied! Needs manual review.",
                    "reasoning": "Positive intent detected. Handing off to sales manager."
                }
        
        self.history.append(response)
        return response

def trigger_nurture_cycle(lead_id: int):
    # In a real app, this would persist the agent graph instance.
    agent = MockLangGraphAgent(lead_id)
    return agent.run_next_step()
