Feature: Yum Brands Homepage

  Scenario: Handle ERR_CONNECTION_RESET error
    Given I navigate to the Yum Brands homepage
    Then I should see the page loaded successfully

  Scenario: Check homepage title
    Given I navigate to the Yum Brands homepage
    Then the page title should contain "Yum.com"

  Scenario: Validate page navigation
    Given I navigate to the Yum Brands homepage
    Then the page should load successfully

  Scenario Outline: Validate menu links navigation
    Given I navigate to the Yum Brands homepage
    When I click on the "<menu>" menu link
    Then I should be navigated to the "<url>" URL

    Examples:
      | menu     | url        |
      | Company  | /company   |
      | Careers  | /careers   |
      | Impact   | /impact    |
      | Investors| /investors |

  Scenario: Measure page load time
    Given I navigate to the Yum Brands homepage
    Then the page should load within 60000 ms
