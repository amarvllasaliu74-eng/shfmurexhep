import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentOfMonthTab } from '@/components/admin/StudentOfMonthTab';
import { TopStudentsTab } from '@/components/admin/TopStudentsTab';
import { ActivitiesTab } from '@/components/admin/ActivitiesTab';
import { TournamentsTab } from '@/components/admin/TournamentsTab';
import { AnnouncementsTab } from '@/components/admin/AnnouncementsTab';
import { HeroSlidesTab } from '@/components/admin/HeroSlidesTab';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero-slides');
  const [data, setData] = useState({
    students: [],
    topStudents: [],
    activities: [],
    tournaments: [],
    announcements: [],
    heroSlides: []
  });

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      const responses = await Promise.all([
        axios.get(`${API}/student-of-month`),
        axios.get(`${API}/top-students`),
        axios.get(`${API}/activities`),
        axios.get(`${API}/tournaments`),
        axios.get(`${API}/announcements`)
      ]);
      
      setData({
        students: responses[0].data,
        topStudents: responses[1].data,
        activities: responses[2].data,
        tournaments: responses[3].data,
        announcements: responses[4].data
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900" data-testid="dashboard-title">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Sh.F.M.U. "Rexhep Elmazi"</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => navigate('/')} data-testid="view-website-btn">
                View Website
              </Button>
              <Button variant="destructive" onClick={handleLogout} data-testid="logout-btn">
                <LogOut className="mr-2" size={18} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full mb-8">
            <TabsTrigger value="student-of-month">Student of Month</TabsTrigger>
            <TabsTrigger value="top-students">Top Students</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="student-of-month">
            <StudentOfMonthTab data={data.students} onRefresh={fetchAllData} />
          </TabsContent>

          <TabsContent value="top-students">
            <TopStudentsTab data={data.topStudents} onRefresh={fetchAllData} />
          </TabsContent>

          <TabsContent value="activities">
            <ActivitiesTab data={data.activities} onRefresh={fetchAllData} />
          </TabsContent>

          <TabsContent value="tournaments">
            <TournamentsTab data={data.tournaments} onRefresh={fetchAllData} />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsTab data={data.announcements} onRefresh={fetchAllData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
