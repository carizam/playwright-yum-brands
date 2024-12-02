Feature: Yum Brands Homepage

  Scenario: Verify Yum homepage title
    Given I navigate to the Yum Brands homepage
    Then the page title should contain "Yum.com"

  Scenario: Measure page load time
    Given I navigate to the Yum Brands homepage
    When the page loads
    Then the load time should be less than 60 seconds

  Scenario Outline: Verify menu links
    Given I navigate to the Yum Brands homepage
    When I click on the "<menu_item>" link
    Then the URL should contain "<expected_url>"

    Examples:
      | menu_item | expected_url  |
      | Company   | /company      |
      | Careers   | /careers      |
      | Impact    | /impact       |
      | Investors | /investors    |
