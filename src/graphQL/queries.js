import { gql } from "graphql-request";

export const getBuildingsQuery = gql`
  {
    Buildings {
      id
      name
    }
  }
`;

export const getMeetingRoomsQuery = gql`
  {
    MeetingRooms {
      name
      meetings {
        date
        startTime
        endTime
      }
    }
  }
`;

export const getMeetingsQuery = gql`
  {
    Meetings {
      id
      date
      startTime
      endTime
    }
  }
`;

export const getRoomsInBuildingQuery = gql`
  query getRooms($buildingId: Int!) {
    Building(id: $buildingId) {
      name
      meetingRooms {
        id
        name
        floor
        meetings {
          date
          startTime
          endTime
        }
      }
    }
  }
`;
