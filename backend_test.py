import requests
import sys
from datetime import datetime
import json

class SchoolWebsiteAPITester:
    def __init__(self, base_url="https://gjilan-shkolla.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    else:
                        print(f"   Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'Non-dict response'}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                self.failed_tests.append(f"{name}: Expected {expected_status}, got {response.status_code}")
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response.json() if success and response.text else {}

        except Exception as e:
            self.failed_tests.append(f"{name}: Error - {str(e)}")
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_admin_login(self):
        """Test admin login"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "auth/login",
            200,
            data={"username": "admin", "password": "admin123"}
        )
        return success and response.get('success', False)

    def test_student_of_month_crud(self):
        """Test Student of Month CRUD operations"""
        print("\n📚 Testing Student of Month CRUD...")
        
        # Get existing students
        success, students = self.run_test("Get Students of Month", "GET", "student-of-month", 200)
        if not success:
            return False
            
        # Create new student
        new_student = {
            "name": "Test Student",
            "class_name": "10A",
            "month": "Shkurt",
            "year": 2026,
            "reason": "Test reason for excellence"
        }
        
        success, created = self.run_test("Create Student of Month", "POST", "student-of-month", 200, new_student)
        if not success:
            return False
            
        student_id = created.get('id')
        if not student_id:
            print("❌ No ID returned from create operation")
            return False
            
        # Update student
        updated_student = new_student.copy()
        updated_student['reason'] = "Updated test reason"
        updated_student['id'] = student_id
        
        success, _ = self.run_test(f"Update Student of Month", "PUT", f"student-of-month/{student_id}", 200, updated_student)
        if not success:
            return False
            
        # Delete student
        success, _ = self.run_test(f"Delete Student of Month", "DELETE", f"student-of-month/{student_id}", 200)
        return success

    def test_top_students_crud(self):
        """Test Top Students CRUD operations"""
        print("\n🏆 Testing Top Students CRUD...")
        
        # Get existing students
        success, students = self.run_test("Get Top Students", "GET", "top-students", 200)
        if not success:
            return False
            
        # Create new top student
        new_student = {
            "subject": "Test Subject",
            "name": "Test Top Student",
            "class_name": "11B",
            "achievement": "Test achievement description"
        }
        
        success, created = self.run_test("Create Top Student", "POST", "top-students", 200, new_student)
        if not success:
            return False
            
        student_id = created.get('id')
        if not student_id:
            print("❌ No ID returned from create operation")
            return False
            
        # Update student
        updated_student = new_student.copy()
        updated_student['achievement'] = "Updated achievement"
        updated_student['id'] = student_id
        
        success, _ = self.run_test(f"Update Top Student", "PUT", f"top-students/{student_id}", 200, updated_student)
        if not success:
            return False
            
        # Delete student
        success, _ = self.run_test(f"Delete Top Student", "DELETE", f"top-students/{student_id}", 200)
        return success

    def test_activities_crud(self):
        """Test Activities CRUD operations"""
        print("\n🎯 Testing Activities CRUD...")
        
        # Get existing activities
        success, activities = self.run_test("Get Activities", "GET", "activities", 200)
        if not success:
            return False
            
        # Create new activity
        new_activity = {
            "title": "Test Activity",
            "description": "Test activity description",
            "date": "2026-03-15",
            "images": []
        }
        
        success, created = self.run_test("Create Activity", "POST", "activities", 200, new_activity)
        if not success:
            return False
            
        activity_id = created.get('id')
        if not activity_id:
            print("❌ No ID returned from create operation")
            return False
            
        # Update activity
        updated_activity = new_activity.copy()
        updated_activity['description'] = "Updated activity description"
        updated_activity['id'] = activity_id
        
        success, _ = self.run_test(f"Update Activity", "PUT", f"activities/{activity_id}", 200, updated_activity)
        if not success:
            return False
            
        # Delete activity
        success, _ = self.run_test(f"Delete Activity", "DELETE", f"activities/{activity_id}", 200)
        return success

    def test_tournaments_crud(self):
        """Test Tournaments CRUD operations"""
        print("\n🏅 Testing Tournaments CRUD...")
        
        # Get existing tournaments
        success, tournaments = self.run_test("Get Tournaments", "GET", "tournaments", 200)
        if not success:
            return False
            
        # Create new tournament
        new_tournament = {
            "name": "Test Tournament",
            "sport_type": "Test Sport",
            "date": "2026-04-20",
            "results": "Test results",
            "winners": "Test winners",
            "images": []
        }
        
        success, created = self.run_test("Create Tournament", "POST", "tournaments", 200, new_tournament)
        if not success:
            return False
            
        tournament_id = created.get('id')
        if not tournament_id:
            print("❌ No ID returned from create operation")
            return False
            
        # Update tournament
        updated_tournament = new_tournament.copy()
        updated_tournament['results'] = "Updated results"
        updated_tournament['id'] = tournament_id
        
        success, _ = self.run_test(f"Update Tournament", "PUT", f"tournaments/{tournament_id}", 200, updated_tournament)
        if not success:
            return False
            
        # Delete tournament
        success, _ = self.run_test(f"Delete Tournament", "DELETE", f"tournaments/{tournament_id}", 200)
        return success

    def test_announcements_crud(self):
        """Test Announcements CRUD operations"""
        print("\n📢 Testing Announcements CRUD...")
        
        # Get existing announcements
        success, announcements = self.run_test("Get Announcements", "GET", "announcements", 200)
        if not success:
            return False
            
        # Create new announcement
        new_announcement = {
            "text": "Test announcement message"
        }
        
        success, created = self.run_test("Create Announcement", "POST", "announcements", 200, new_announcement)
        if not success:
            return False
            
        announcement_id = created.get('id')
        if not announcement_id:
            print("❌ No ID returned from create operation")
            return False
            
        # Delete announcement (no update endpoint for announcements)
        success, _ = self.run_test(f"Delete Announcement", "DELETE", f"announcements/{announcement_id}", 200)
        return success

def main():
    print("🏫 Starting School Website API Testing...")
    print("=" * 60)
    
    tester = SchoolWebsiteAPITester()
    
    # Test admin authentication
    print("\n🔐 Testing Authentication...")
    if not tester.test_admin_login():
        print("❌ Admin login failed - stopping tests")
        return 1
    
    # Test all CRUD operations
    crud_tests = [
        ("Student of Month", tester.test_student_of_month_crud),
        ("Top Students", tester.test_top_students_crud),
        ("Activities", tester.test_activities_crud),
        ("Tournaments", tester.test_tournaments_crud),
        ("Announcements", tester.test_announcements_crud)
    ]
    
    for test_name, test_func in crud_tests:
        try:
            if not test_func():
                print(f"❌ {test_name} CRUD tests failed")
        except Exception as e:
            print(f"❌ {test_name} CRUD tests error: {str(e)}")
            tester.failed_tests.append(f"{test_name}: Exception - {str(e)}")
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.failed_tests:
        print(f"\n❌ Failed Tests ({len(tester.failed_tests)}):")
        for failure in tester.failed_tests:
            print(f"   • {failure}")
    else:
        print("\n✅ All tests passed!")
    
    success_rate = (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0
    print(f"📈 Success Rate: {success_rate:.1f}%")
    
    return 0 if success_rate >= 80 else 1

if __name__ == "__main__":
    sys.exit(main())