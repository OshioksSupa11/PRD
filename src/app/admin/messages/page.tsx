'use client';

import { useEffect, useState } from 'react';
import { Mail, Trash2, Eye, EyeOff, CheckCircle, Clock } from 'lucide-react';
import {
  updateMessageStatus,
  deleteMessage,
} from '@/lib/actions/messages';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

const statusBadge: Record<string, { label: string; className: string }> = {
  unread: { label: 'Unread', className: 'bg-blue-100 text-blue-800' },
  read: { label: 'Read', className: 'bg-gray-100 text-gray-700' },
  replied: { label: 'Replied', className: 'bg-green-100 text-green-800' },
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages');
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusUpdate = async (id: string, status: 'read' | 'replied' | 'unread') => {
    await updateMessageStatus(id, status);
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await deleteMessage(id);
    fetchMessages();
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-primary mb-8">Messages</h1>
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">Messages</h1>
        <span className="text-sm text-text-muted">
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-xl border border-border bg-bg p-12 text-center">
          <Mail className="mx-auto h-12 w-12 text-text-muted" />
          <h3 className="mt-4 text-lg font-bold text-primary">No Messages</h3>
          <p className="mt-2 text-sm text-text-muted">
            Contact form submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-bg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-bg-alt">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-bg-alt/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-text">{msg.name}</span>
                      <span className="block text-xs text-text-muted">{msg.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
                        className="text-sm text-text hover:text-accent transition-colors text-left"
                      >
                        {msg.subject}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {formatDate(msg.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge[msg.status].className}`}
                      >
                        {msg.status === 'unread' && <Clock className="h-3 w-3" />}
                        {msg.status === 'replied' && <CheckCircle className="h-3 w-3" />}
                        {statusBadge[msg.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {msg.status !== 'read' && (
                          <button
                            onClick={() => handleStatusUpdate(msg.id, 'read')}
                            className="rounded-lg p-2 text-text-muted hover:bg-bg-alt hover:text-text transition-colors"
                            title="Mark as Read"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        {msg.status !== 'replied' && (
                          <button
                            onClick={() => handleStatusUpdate(msg.id, 'replied')}
                            className="rounded-lg p-2 text-text-muted hover:bg-bg-alt hover:text-green-600 transition-colors"
                            title="Mark as Replied"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="rounded-lg p-2 text-text-muted hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {expandedId && (() => {
            const msg = messages.find((m) => m.id === expandedId);
            if (!msg) return null;
            return (
              <div className="border-t border-border bg-bg-alt p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-primary">
                    Message from {msg.name}
                  </span>
                  <button
                    onClick={() => setExpandedId(null)}
                    className="text-text-muted hover:text-text transition-colors"
                  >
                    <EyeOff className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-text whitespace-pre-wrap">{msg.message}</p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
