from unittest import TestCase

import src.user_handler as uh

class TestUserHandler(TestCase):
  
    def test_support_datetime_default_not_dateformat(self):
        with self.assertRaises(TypeError) as tr:
            uh.support_datetime_default('2019/01/01')

