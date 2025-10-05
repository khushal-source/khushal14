import { useState, useEffect } from 'react';
import { getChats, getChat, sendMessage } from '../services/chatService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiSend } from 'react-icons/fi';

const Chats = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const data = await getChats();
      setChats(data.data);
      if (data.data.length > 0 && !selectedChat) {
        fetchChatDetails(data.data[0]._id);
      }
    } catch (error) {
      toast.error('Failed to fetch chats');
    } finally {
      setLoading(false);
    }
  };

  const fetchChatDetails = async (chatId) => {
    try {
      const data = await getChat(chatId);
      setSelectedChat(data.data);
    } catch (error) {
      toast.error('Failed to fetch chat details');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    setSending(true);
    try {
      const data = await sendMessage(selectedChat._id, message);
      setSelectedChat(data.data);
      setMessage('');
      fetchChats(); // Refresh chat list
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const getOtherParticipant = (chat) => {
    return chat.participants.find(p => p._id !== user._id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>

        {chats.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-600">No messages yet. Start a conversation by contacting a seller!</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
              {/* Chat List */}
              <div className="border-r border-gray-200 overflow-y-auto">
                {chats.map((chat) => {
                  const otherUser = getOtherParticipant(chat);
                  return (
                    <button
                      key={chat._id}
                      onClick={() => fetchChatDetails(chat._id)}
                      className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition ${
                        selectedChat?._id === chat._id ? 'bg-primary-50' : ''
                      }`}
                    >
                      <img
                        src={otherUser.avatar || 'https://via.placeholder.com/48'}
                        alt={otherUser.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-grow text-left">
                        <p className="font-semibold text-gray-900">{otherUser.name}</p>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {chat.product?.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Chat Messages */}
              <div className="col-span-2 flex flex-col">
                {selectedChat ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                      <img
                        src={selectedChat.product?.images?.[0]?.url || 'https://via.placeholder.com/48'}
                        alt={selectedChat.product?.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold">{selectedChat.product?.title}</p>
                        <p className="text-sm text-gray-600">
                          with {getOtherParticipant(selectedChat).name}
                        </p>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                      {selectedChat.messages?.length === 0 ? (
                        <p className="text-center text-gray-600">No messages yet. Start the conversation!</p>
                      ) : (
                        selectedChat.messages.map((msg, index) => {
                          const isOwn = msg.sender._id === user._id || msg.sender === user._id;
                          return (
                            <div
                              key={index}
                              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-xs px-4 py-2 rounded-lg ${
                                  isOwn
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-200 text-gray-900'
                                }`}
                              >
                                <p>{msg.content}</p>
                                <p className={`text-xs mt-1 ${isOwn ? 'text-primary-100' : 'text-gray-600'}`}>
                                  {new Date(msg.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Message Input */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-grow input-field"
                        />
                        <button
                          type="submit"
                          disabled={sending || !message.trim()}
                          className="btn-primary px-6 disabled:opacity-50"
                        >
                          <FiSend />
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-600">
                    Select a chat to view messages
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
