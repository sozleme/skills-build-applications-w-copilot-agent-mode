from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def setUp(self):
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')
        user = User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel)
        Workout.objects.create(name='Hero HIIT', description='HIIT for heroes')
        Leaderboard.objects.create(team=marvel, points=100)
        Activity.objects.create(user=user, type='Running', duration=30, date='2026-03-09')

    def test_user(self):
        self.assertEqual(User.objects.count(), 1)

    def test_team(self):
        self.assertEqual(Team.objects.count(), 2)

    def test_activity(self):
        self.assertEqual(Activity.objects.count(), 1)

    def test_workout(self):
        self.assertEqual(Workout.objects.count(), 1)

    def test_leaderboard(self):
        self.assertEqual(Leaderboard.objects.count(), 1)
