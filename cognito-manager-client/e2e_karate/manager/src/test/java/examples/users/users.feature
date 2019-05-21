@ignore
Feature: Scenario for user operation.

Background:
* url 'http://localhost:4200'

Scenario: Access to login page

  Given path '/'
  When method get
  Then status 200