# SAP Fiori Travel Agency App - User Documentation

## 1. App Overview

The **Travel Agency** Fiori app is a custom SAP Fiori elements application designed for managing the complete lifecycle of travel arrangements. It provides a centralized platform for agency staff to create and maintain travel requests, customer details, flight bookings, and associated bookings.

The app follows the standard SAP Fiori design principles and is built using the SAP Fiori tools and the ABAP RESTful Application Programming Model (RAP).

## 2. Data Model & Key Business Entities

The application is structured around four core entities and their relationships.

### 2.1 Customer
Represents a person or organization that uses the travel agency's services.

*   **Key Fields:**
    *   `CustomerID` (Key): Unique identifier for the customer.
    *   `FirstName`: Customer's first name.
    *   `LastName`: Customer's last name.
    *   `EmailAddress`: Primary contact email.
    *   `PhoneNumber`: Primary contact phone number.
    *   `DateOfBirth`: Customer's date of birth.
    *   `LoyaltyStatus` (e.g., Silver, Gold, Platinum): Customer's loyalty tier.
*   **Relationships:**
    *   A **Customer** can be associated with multiple **Travels**.

### 2.2 Travel
Represents a single travel request or itinerary for a customer. It is the central document that groups all related bookings.

*   **Key Fields:**
    *   `TravelID` (Key): Unique identifier for the travel request.
    *   `CustomerID`: Link to the associated customer.
    *   `AgencyID`: Identifier for the managing travel agency.
    *   `TotalPrice`: Calculated total cost of the travel (sum of all booking prices).
    *   `CurrencyCode`: The currency used for all prices (e.g., USD, EUR).
    *   `Status` (e.g., New, Approved, Booked, Canceled): The current status of the overall travel.
    *   `Description`: A free-text description of the travel purpose.
    *   `BeginDate`: Planned start date of the travel.
    *   `EndDate`: Planned end date of the travel.
*   **Relationships:**
    *   A **Travel** must have one **Customer**.
    *   A **Travel** can have multiple **Bookings**.

### 2.3 Booking
Represents a specific reservation within a travel, such as a flight or a hotel. For this app, the primary focus is on flight bookings.

*   **Key Fields:**
    *   `BookingID` (Key): Unique identifier for the booking within a travel.
    *   `TravelID`: Link to the parent travel.
    *   `BookingDate`: Date when the booking was made.
    *   `Price`: The cost of this specific booking.
    *   `CurrencyCode`: Currency for the booking price.
*   **Relationships:**
    *   A **Booking** must belong to one **Travel**.
    *   A **Booking** is linked to one **Flight**.

### 2.4 Flight
Represents a specific flight offered by an airline. This is a master data entity.

*   **Key Fields:**
    *   `FlightID` (Key): Unique identifier for the flight (e.g., Flight Number).
    *   `AirlineID`: Code of the operating airline (e.g., AA, LH).
    *   `AirlineName`: Full name of the airline.
    *   `ConnectionID`: Identifier for the specific route.
    *   `DepartureAirport`: IATA code of the departure airport (e.g., JFK).
    *   `DestinationAirport`: IATA code of the arrival airport (e.g., FRA).
    *   `DepartureTime`: Scheduled date and time of departure.
    *   `ArrivalTime`: Scheduled date and time of arrival.
    *   `Price`: Standard price for the flight.
    *   `CurrencyCode`: Currency for the flight price.
*   **Relationships:**
    *   A **Flight** can be referenced by multiple **Bookings**.

## 3. Core User Functions (Use Cases)

### 3.1 Customer Functions
*   **Create a New Customer:** Add a new customer to the system by providing their personal details.
*   **Display Customer Details:** View all information for a specific customer.
*   **Edit Customer Information:** Update a customer's contact details or loyalty status.
*   **Find a Customer:** Search for customers by name, email, or Customer ID.

### 3.2 Travel Functions
*   **Create a New Travel:**
    1.  Start from the Customer object page or the Travel list.
    2.  Select a Customer.
    3.  Enter travel details: Description, Begin Date, End Date, Agency.
*   **Display Travel Overview:** View a list of all travels with key information like ID, Customer, Status, and Total Price.
*   **Edit a Travel:** Modify travel details like dates, description, or status.
*   **Set Travel Status:** Change the status of a travel (e.g., from "New" to "Approved").
*   **Delete a Travel:** Remove a travel that is no longer needed (subject to authorization).

### 3.3 Booking & Flight Functions
*   **Add a Booking to a Travel:**
    1.  Navigate to the Bookings sub-section on the Travel object page.
    2.  Press "Add Booking".
    3.  Search for and select an available **Flight**.
    4.  The system automatically proposes the flight's price, which can be overridden.
*   **Remove a Booking from a Travel:** Delete a specific booking from a travel itinerary.
*   **Search for Flights:** Use the flight search functionality to find available flights by departure, destination, and date.
*   **View Flight Details:** See detailed information for a selected flight.

## 4. App Navigation & Common User Queries

*   **How do I create a new travel for an existing customer?**
    *   *Action:* Go to the "Customers" list, find and select the customer. On their details page, navigate to the "Travels" section and click "Create".
*   **I need to see all bookings for a specific travel.**
    *   *Action:* Go to the "Travels" list, find the travel by its ID or customer name, and open it. The "Bookings" tab will show all associated bookings.
*   **A customer wants to change their flight. How do I do that?**
    *   *Action:* Open the relevant Travel, go to the "Bookings" tab, delete the old flight booking, and then add a new booking with the desired flight.
*   **How do I find all travels that are still in 'New' status?**
    *   *Action:* On the "Travels" list page, use the filter feature to filter the "Status" column for the value "New".
*   **What's the total price of this customer's upcoming travel?**
    *   *Action:* The "TotalPrice" is displayed directly on the Travel object's header and in the Travels list. Find the customer's travel to see it.
*   **How can I update a customer's phone number?**
    *   *Action:* Go to the "Customers" list, find the customer, enter edit mode (by clicking the 'Edit' button), update the phone number field, and save.

## 5. Business Rule Validations

### 5.1 Customer Validations

#### 5.1.1 Credit & Payment Validations
- **Credit Limit Enforcement**: Prevent new bookings if the customer's total outstanding balance plus the new travel cost exceeds their approved credit limit.
- **Overdue Payment Block**: Restrict creating new travels if the customer has any invoice overdue by more than 90 days.
- **Deposit Requirement**: Require a 50% deposit for all travels with a total price exceeding $10,000.
- **Loyalty Tier Limits**: Enforce maximum booking values per loyalty tier (e.g., Silver: $5,000, Gold: $15,000, Platinum: Unlimited).

#### 5.1.2 Data Quality Validations
- **Email Format Validation**: Ensure email addresses follow proper format and domain structure.
- **Age Verification**: Prevent customers under 18 from booking international travels without adult accompaniment.
- **Duplicate Customer Check**: Warn when creating a customer with matching first name, last name, and date of birth as an existing record.

### 5.2 Travel Validations

#### 5.2.1 Timeline & Date Validations
- **Travel Date Consistency**: Ensure `BeginDate` is always before `EndDate`.
- **Advance Booking Window**: Prevent bookings more than 365 days in advance for standard customers (Platinum members: 540 days).
- **Last-Minute Booking Surcharge Warning**: Display warning for bookings made less than 72 hours before departure.
- **Minimum Trip Duration**: Enforce minimum 1-night stay for all hotel-inclusive packages.

#### 5.2.2 Financial Validations
- **Price Consistency**: Ensure all bookings within a travel use the same `CurrencyCode` as the parent travel.
- **Budget Adherence**: Warn travel agents when adding bookings that cause the travel to exceed the customer's pre-approved budget by more than 10%.
- **Seasonal Pricing Rules**: Apply seasonal surcharges during peak travel periods (holidays, summer months).

### 5.3 Booking Validations

#### 5.3.1 Flight-Specific Validations
- **Flight Availability Check**: Verify flight has available seats before confirming booking.
- **Cancelled Flight Prevention**: Prevent booking on flights with `Status = 'Cancelled'`.
- **Connection Time Validation**: Ensure minimum connection time of 60 minutes for domestic and 90 minutes for international flight connections.
- **Airport Curfew Compliance**: Block bookings for flights departing or arriving outside of permitted airport operating hours.

#### 5.3.2 Business Logic Validations
- **Duplicate Booking Prevention**: Prevent duplicate bookings for the same customer on the same flight/date.
- **Capacity Limits**: Enforce maximum group size of 9 passengers per travel agent for standard bookings.
- **Booking Modification Deadline**: Prevent changes to bookings less than 24 hours before departure for economy class, 4 hours for business class.

### 5.4 Cross-Entity Validations

#### 5.4.1 Compliance & Regulatory Validations
- **Travel Document Validation**: Verify passport validity extends at least 6 months beyond travel end date for international destinations.
- **Visa Requirement Check**: Flag travels to destinations requiring visas and prompt agent to verify visa status.
- **Health Requirement Compliance**: Check vaccination requirements for specific destinations and alert agents.

#### 5.4.2 Advanced Business Rules
- **Blackout Period Validation**: Restrict bookings during company-mandated blackout periods (system maintenance, year-end closing).
- **Preferred Supplier Enforcement**: Require use of preferred airlines for corporate clients, with override justification.
- **Geographic Restrictions**: Block bookings to destinations under travel advisories or embargoed countries.
- **Commission Validation**: Ensure agent commission doesn't exceed 15% of total booking value without manager approval.

#### 5.4.3 Status Transition Validations
```
Travel Status Flow: New → Approved → Booked → In Progress → Completed
Allowed transitions:
- New → Approved (Manager approval required for >$5,000)
- Approved → Booked (Payment verification required)
- Booked → Cancelled (Cancellation fees apply based on timing)
- Cannot revert from "Completed" to any previous status
```

#### 5.4.4 Package-Specific Validations
- **Component Consistency**: Ensure all components (flights, hotels) in a package are for the same destination and dates.
- **Minimum Package Value**: Enforce minimum $500 value for custom travel packages.
- **Supplier Compatibility**: Validate that all selected suppliers (airline, hotel, car rental) have partnership agreements.

### 5.5 Implementation Notes

These validations would typically trigger different types of responses:
- **🚫 Hard Errors**: Prevent saving (e.g., credit limit exceeded, cancelled flight)
- **⚠️ Warnings**: Allow override with justification (e.g., budget exceeded, last-minute booking)
- **ℹ️ Informational**: Display messages without blocking (e.g., visa requirements, travel advisories)

Each validation includes:
- **Condition**: When the rule applies
- **Validation Logic**: The business rule to enforce
- **Action**: What happens when violated (error/warning/info)
- **Override**: Whether manager approval can bypass the rule