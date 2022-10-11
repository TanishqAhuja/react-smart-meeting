import React, { useContext, useEffect, useRef, useState } from "react";

import CustomInput from "../../components/CustomInput";
import Tiles from "../../components/Tiles";
import Loader from "../../components/Loader";
import { BuildingsContext } from "../../buildingsContext";
import fetchUsingGQL from "../../graphQL/useGraphQL";
import { getRoomsInBuildingQuery } from "../../graphQL/queries";
import { addMeetingMutation } from "../../graphQL/mutations";
import {
  getAddMeetingQueryVariables,
  getAvailableRooms,
  getBuildingOptions,
  getFormattedRoomsData,
  getNextMeetingId
} from "./utils";

import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function AddMeeting() {
  const [formData, setFormData] = useState({});
  const [availableRooms, setAvailableRooms] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isProcessable, setIsProcessable] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showAvailableRooms, setShowAvailableRooms] = useState(false);
  const [showGoBackAction, setShowGoBackAction] = useState(false);

  const navigate = useNavigate();

  const { buildings, meetings } = useContext(BuildingsContext);
  const formRef = useRef(null);

  useEffect(() => {
    if (showAvailableRooms || showGoBackAction) {
      setShowLoader(false);
      setIsProcessable(false);
    }
  }, [showAvailableRooms, showGoBackAction]);

  useEffect(() => {
    if (isProcessable) {
      const availableRooms = getAvailableRooms(
        rooms,
        formData.date,
        formData.startTime
      );
      setAvailableRooms(availableRooms);

      if (availableRooms.length) {
        setShowAvailableRooms(true);
      } else {
        setShowGoBackAction(true);
      }
    }
  }, [rooms, isProcessable, formData.date, formData.startTime]);

  const saveFormData = (formElements) => {
    const {
      titleField,
      dateField,
      startTimeField,
      endTimeField,
      buildingField
    } = formElements;
    const buildingData = JSON.parse(buildingField.value);

    setFormData({
      title: titleField.value,
      date: new Date(dateField.value).toLocaleDateString(),
      startTime: startTimeField.value,
      endTime: endTimeField.value,
      buildingName: buildingData.name
    });
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();

    if (showGoBackAction) {
      setShowGoBackAction(false);
    } else if (showAvailableRooms) {
      const nextMeetingId = getNextMeetingId(meetings);
      const queryVariables = getAddMeetingQueryVariables(
        formData,
        nextMeetingId
      );

      fetchUsingGQL(addMeetingMutation, queryVariables).then((response) => {
        navigate("/home?showToast=true");
      });
    } else {
      const addMeetingForm = formRef.current;

      const isFormValid = addMeetingForm.checkValidity();
      if (!isFormValid) {
        addMeetingForm.reportValidity();
        return;
      }

      setShowLoader(true);

      const formElements = formRef.current?.elements;
      saveFormData(formElements);

      const { buildingField } = formElements;
      const buildingData = JSON.parse(buildingField.value);
      const queryVariables = {
        buildingId: parseInt(buildingData.id)
      };

      fetchUsingGQL(getRoomsInBuildingQuery, queryVariables).then(
        (response) => {
          const rooms = response?.Building?.meetingRooms || [];
          setRooms(rooms);
          setIsProcessable(true);
        }
      );
    }
  };

  const handleRoomSelect = (roomId) =>
    setFormData((prevFormData) => ({
      roomId,
      ...prevFormData
    }));

  const getButtonLabel = () => {
    if (showLoader) {
      return "...";
    }
    if (showAvailableRooms) {
      return "Add Meeting";
    }
    if (showGoBackAction) {
      return "Go Back";
    }
    return "Next";
  };

  const buildingOptions = getBuildingOptions(buildings);
  const roomsInfo = getFormattedRoomsData(
    availableRooms,
    formData.buildingName
  );

  const isBtnDiasabled = (showAvailableRooms && !formData.roomId) || showLoader;

  const getHeading = () =>
    showAvailableRooms ? "Select A Room" : "Add Meeting";

  const getFormContent = () => {
    if (showLoader) {
      return <Loader theme="pink" />;
    }
    if (showAvailableRooms) {
      return <Tiles tileData={roomsInfo} handleSelect={handleRoomSelect} />;
    }
    if (showGoBackAction) {
      return (
        <h3>
          no rooms available in the building for the selected time slot please
          start again
        </h3>
      );
    }
    return (
      <>
        <CustomInput
          type="text"
          name="titleField"
          label="Title"
          placeholder="Add Title"
          autoFocus
          required
        />
        <CustomInput type="date" name="dateField" label="Date" required />
        <CustomInput
          type="time"
          name="startTimeField"
          label="Start Time"
          required
        />
        <CustomInput
          type="time"
          name="endTimeField"
          label="End Time"
          required
        />
        <CustomInput
          type="select"
          name="buildingField"
          label="Building"
          options={buildingOptions}
          required
        />
      </>
    );
  };

  return (
    <div className="addMeetingContainer">
      <form className="meetingForm" ref={formRef} action="none">
        <h1>{getHeading()}</h1>
        <div className="formContent">{getFormContent()}</div>
        <button
          type="submit"
          className="formBtn"
          onClick={handleFormSubmission}
          disabled={isBtnDiasabled}
        >
          {getButtonLabel()}
        </button>
      </form>
    </div>
  );
}
