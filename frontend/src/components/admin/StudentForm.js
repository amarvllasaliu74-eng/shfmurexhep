import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';

export const StudentForm = ({ form, setForm, onSubmit, onCancel, isEditing }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Name</label>
          <Input
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            required
            data-testid="student-name-input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Class</label>
          <Input
            value={form.class_name}
            onChange={(e) => setForm({...form, class_name: e.target.value})}
            required
            data-testid="student-class-input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Month</label>
          <Input
            value={form.month}
            onChange={(e) => setForm({...form, month: e.target.value})}
            placeholder="e.g., Janar"
            required
            data-testid="student-month-input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Year</label>
          <Input
            type="number"
            value={form.year}
            onChange={(e) => setForm({...form, year: parseInt(e.target.value)})}
            required
            data-testid="student-year-input"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Reason</label>
        <Textarea
          value={form.reason}
          onChange={(e) => setForm({...form, reason: e.target.value})}
          rows={3}
          required
          data-testid="student-reason-input"
        />
      </div>
      <div className="flex space-x-2">
        <Button type="submit" data-testid="submit-student-btn">
          <Save className="mr-2" size={18} />
          {isEditing ? 'Update' : 'Add'} Student
        </Button>
        {isEditing && (
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="mr-2" size={18} />
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};