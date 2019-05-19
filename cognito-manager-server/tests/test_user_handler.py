import sys
import os
from pathlib import Path
import datetime
import unittest

sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)), '../libs'))
import boto3
from pyunitreport import HTMLTestRunner

sys.path.append(str(Path(__file__).parent.parent))
sys.path.append(str(Path(__file__).parent.parent / "src"))
from src import user_handler as uh

html_report_dir = 'html_report' 

class TestUserHandler(unittest.TestCase):
  
  def test_support_datetime_default_not_dateformat(self):
    with self.assertRaises(TypeError) as tr:
        uh.support_datetime_default('2019/01/01')

  def test_support_datetime_default_dateformat(self):
    now_date = datetime.datetime.now()
    self.assertEquals(uh.support_datetime_default(now_date), now_date.isoformat())

if __name__=='__main__':
  unittest.main(testRunner=HTMLTestRunner(output=html_report_dir))
    
    
