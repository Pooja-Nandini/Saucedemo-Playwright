Feature: Login in to the Saucelabs
  Scenario Outline: Login with valid credentials
    Given user open the login page
    When user login with "<username>" and "<password>"
    Then user should land on the products page
    Examples:
      | username      | password     |
      | standard_user | secret_sauce |

  Scenario Outline: Filter the products, add products to the cart 
    Given user is on the products page with "<username>" and "<password>"
    When user select any "<option>" from the dropdown
    Then the products should display accordingly
    Then add the products to the cart
    When clicked on the shopping cart
    Then user is navigated to your cart page
    And the product labels should display
    When clicked on the checkout button
    Then navigate to checkout your information page
    When user fill "<firstname>" "<lastname>" "<zip>" details
    And click on continue button
    Then the user should land on checkout overview page
    And the product labels should display
    And the total price of the products along with tax display
    When user click on the finish button
    Then the thank you banner should display

    Examples:
      | username      | password     | option              | firstname | lastname | zip  |
      | standard_user | secret_sauce | Price (low to high) | Dore      | mon      | 5555 |
