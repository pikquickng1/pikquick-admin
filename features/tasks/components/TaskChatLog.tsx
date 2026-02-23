"use client";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

interface TaskChatLogProps {
  messages: ChatMessage[];
}

export function TaskChatLog({ messages }: TaskChatLogProps) {
  console.log("TaskChatLog messages:", messages);
  
  return (
    <div className="bg-white rounded-2xl border border-light p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Chat Log</h3>

      <div className="space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-text-primary">
                  {message.sender}
                </span>
                <span className="text-xs text-text-secondary">{message.timestamp}</span>
              </div>
              <p className="text-sm text-text-secondary">{message.message}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-text-secondary text-center py-4">No messages yet</p>
        )}
      </div>
    </div>
  );
}
