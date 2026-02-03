import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const AnnouncementsTab = ({ data, onRefresh }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/announcements`, { text });
      toast.success('Added');
      setText('');
      onRefresh();
    } catch (error) {
      toast.error('Failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/announcements/${id}`);
      toast.success('Deleted');
      onRefresh();
    } catch (error) {
      toast.error('Failed');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Announcement Text (for Live TV)</label>
            <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} placeholder="Enter announcement text" required />
          </div>
          <Button type="submit"><Plus className="mr-2" size={18} />Add Announcement</Button>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Active Announcements</h3>
          <div className="space-y-2">
            {data.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                <p className="text-sm">{item.text}</p>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};