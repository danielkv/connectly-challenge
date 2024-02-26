# The application

The Flow Builder frontend application offers a user-friendly interface for designing and managing communication workflows and campaigns. Users can construct workflows by selecting as many nodes as necessary from a left panel, each with customizable properties such as message type and content.

## Frontend

The frontend must be is sleek and efficient, built with React for smooth user interaction. It features intuitive UI components for node selection, audience management, and scheduling. Integration with the backend through RESTful APIs enables seamless workflow creation and campaign management.

Check the layout on Figma [here](https://www.figma.com/file/QRt9idP5r597pOEDCrlEAq/Connectly-layout?type=design&node-id=1%3A8727&mode=dev&t=RdwMhXsVw53m5udQ-1)

## Backend

The application seamlessly integrates with backend services through RESTful APIs, handling data flow for node configurations, audience management, and campaign scheduling. Error handling mechanisms ensure smooth operation, guiding users through any issues encountered during workflow creation or campaign management.

# Frontend Architecture

To architect the frontend application for this Flow Builder tool, we can follow a structured approach using modern frontend development principles. Here's a proposal outlining the components, layers, data flow, backend touchpoints, metrics, and potential edge cases

## Overview

Component-Based Architecture: Utilize a component-based architecture using frameworks like React.js or Vue.js for building reusable UI components.

-   **State Management** : Implement state management using libraries like `Zustand` to manage application state and data flow effectively. Avoid implementing `Redux` which can bring unecessary complexity to the project, only use it if it's really necessary.

-   **API Integration**: Communicate with the backend server using RESTful APIs for fetching and sending data.

-   **Error Handling**: Implement robust error handling mechanisms to handle errors during data submission, API calls, and user interactions gracefully. User must always know how to fix or workaround it.

-   **Authentication and Authorization**: Implement user authentication and authorization mechanisms to ensure secure access to the application and data.

-   **Campaign Scheduling**: Users can select immediate or scheduled sending option. Backend API is called to schedule the campaign for a future time or publish it immediately.

-   **Audience**: The users need to be able to choose the audience of Campaign. The audience is list of phone numbers, the user can pick one audience where this Campagin should be sent to. 

## Components / Layers

Abstract to a shared functions or shared components what need to be reusable. Think ahead of maintainability, when needed, the support team should be able to identify the matter quickly to fix or add new features. It's a common practice to separate the logic from the main design files (.tsx), this way the application doesn't have any giant files, always try to have at maximum 100-150 lines in mind.

-   **UI Components**: Develop UI components for the main screen, audience selection, audience upload, scheduling options, etc. Use Atomic Design methodology to structure shared components. [Read More](https://atomicdesign.bradfrost.com/table-of-contents/)

-   **State Management Layer**: The state management must be carefully designed according to the domain. Each store should be accessible only for who needs the data. Use Provider components to achive that goal.

-   **API Services Layer**: All the API connections and requests must be done using the UseCase pattern. Each API endpoint must be in its own file and utilize a shared httpClient provider.

**Here is what the file structure should look like:**

```
	src
	|--common
	|--|--components
	|--|--|--atoms
	|--|--|--molecules
	|--|--|--organisms
	|--|--|--templates
	|--|--providers
	|--|--helpers
	|--|--interfaces
	|--domain
	|--|--useCases
	|--|--|--flowBuilder
	|--|--|--|--saveFlowUseCase.ts
	|--router
	|--view
	|--|--FlowBuilder
	|--|--|--components
	|--|--index.tsx
	[...]
```

# API Contracts

## Campaign

| Field       | Type     | Required | Default | Description                       |
| ----------- | -------- | -------- | ------- | --------------------------------- |
| id          | string   | true     | UUID    | Campaign Unique ID                |
| name        | string   | true     | -       | Name of the Campaign              |
| published   | boolean  | true     | -       | If the campaign is published      |
| schedule_to | DateTime | false    | null    | When Campaign should be published |
| create_at   | DateTime | true     | now()   | When campaign was created         |
| nodes       | Node[]   | true     | -       | Nodes of the flow                 |
| audience    | string   | true     | -       | Audience ID                       |

## Audience

| Field       | Type     | Required | Default | Description                       |
| ----------- | -------- | -------- | ------- | --------------------------------- |
| id          | string   | true     | -       | Audience ID                       |
| name        | string   | true     | -       | User ID                           |
| list_size   | number   | true     | -       | Size of the list                  |
| users       | User[]   | true     | -       | List                  |

## User

| Field       | Type     | Required | Default | Description                       |
| ----------- | -------- | -------- | ------- | --------------------------------- |
| id            | string   | true     | -       | Audience ID                       |
| name          | string   | true     | -       | User ID                           |
| phone_number   | number   | true     | -       | Size of the list                  |
| city          | string   | true     | -       | Size of the list                  |

{{user.phone_number}}

## Node

| Field     | Type                        | Required | Default | Description                     |
| --------- | --------------------------- | -------- | ------- | ------------------------------- |
| id        | string                      | true     | UUID    | Node Unique ID                  |
| type      | enum (message, api_request) | true     | message | Node Type                       |
| metadata  | object                      | true     | -       | Node data (depends on the type) |
| create_at | DateTime                    | true     | now()   | When node was created           |
| links     | string[]                    | true     | -       | List of the linked nodes        |

## Message (node type)

| Field   | Type     | Required | Default | Description       |
| ------- | -------- | -------- | ------- | ----------------- |
| body    | string   | true     | -       | Message body      |
| image   | string   | false    | null    | Message image URL |
| footer  | string   | false    | null    | Message Footer    |
| buttons | string[] | true     | []      | List of buttons   |

## API_Request (node type)

| Field  | Type                         | Required | Default | Description                       |
| ------ | ---------------------------- | -------- | ------- | --------------------------------- |
| url    | string                       | true     | -       | Request URL                       |
| body   | object                       | true     | -       | Body params to use in the request |
| method | enum (POST, GET, DELETE,...) | true     | GET     | Request method                    |

# Measuring Metrics

-   **User Engagement**: Measure user interactions with the application, such as the number of workflows created, audiences selected, and campaigns scheduled.
-   **Error Rate**: Monitor the rate of errors during audience upload, verification, and campaign scheduling processes.
-   **Conversion Rate**: Track the conversion rate from campaigns sent to user responses or actions taken.

# Edge Cases

-   **Large Audience Uploads**: Handle cases where users upload large audience files by implementing pagination or chunking strategies.
-   **Invalid Data Formats**: Address scenarios where uploaded audience data doesn't match with the required format by providing clear error messages and guidance to users.
-   **Network Failures**: Implement retry mechanisms for failed API requests and provide feedback to users in case of network failures.
-   **Concurrency Issues**: Manage concurrent access to shared resources like audiences and campaigns to prevent data inconsistencies. Utilize locking mechanisms or optimistic concurrency control.

By following this proposed architecture and considering potential edge cases, the frontend application for the Flow Builder tool can be developed to provide a robust and long term maintainability for the support team.
