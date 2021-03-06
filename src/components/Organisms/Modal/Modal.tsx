import React, { useState, useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  registMyActivity,
  editMyActivity,
  deleteMyActivity,
} from "../../../assets/script/";
import {
  CommentWindow,
  LevelDesc,
  SelectCategory,
  AccountDelete,
  ActivityDelete,
  SaveText,
} from "../../Molecules/Modal";

import axios from "axios";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
interface Props {
  showModal: any;
  setShowModal: any;
  type: string;
  companyId?: any;
  content?: string;
  editId?: number;
  deleteId?: number;
  getMyData?: any;
}

const Modal: React.FC<Props> = (props) => {
  const [saveTextModal, setSaveTextModal] = useState<boolean>(false);

  const [currentText, setCurrentText] = useState<string>();
  const [useDraftText, setUseDraftText] = useState<string>();

  const registerActivity = (text: string) => {
    registMyActivity({ content: text });
    props.getMyData();
  };
  const editActivity = (id: number, text: string) => {
    editMyActivity(id, text);
    props.getMyData();
  };
  const deleteActivity = (id: number) => {
    deleteMyActivity(id);
    props.getMyData();
  };

  const rootingModalRender = () => {
    if (props.type === "activity-post") {
      return (
        <CommentWindow
          ttl="アクティビティを投稿"
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          setSaveTextModal={setSaveTextModal}
          content={useDraftText}
          setCurrentText={setCurrentText}
          btnClickFunc={registerActivity}
          type="regist"
        />
      );
    } else if (props.type === "select-post-category") {
      return (
        <SelectCategory
          setShowModal={props.setShowModal}
          companyId={props.companyId}
        />
      );
    } else if (props.type === "write-comment") {
      return (
        <CommentWindow
          ttl="会社に対するコメントを書く"
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          setSaveTextModal={setSaveTextModal}
          content={useDraftText}
        />
      );
    } else if (props.type === "activity-edit") {
      return (
        <CommentWindow
          ttl="アクティビティを編集"
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          setSaveTextModal={setSaveTextModal}
          setCurrentText={setCurrentText}
          btnClickFunc={editActivity}
          content={props.content}
          editId={props.editId}
          type="edit"
        />
      );
    } else if (props.type === "activity-delete") {
      return (
        <ActivityDelete
          setShowModal={props.setShowModal}
          deleteId={Number(props.deleteId)}
          btnClickFunc={deleteActivity}
        />
      );
    } else if (props.type === "company-level") {
      return <LevelDesc setShowModal={props.setShowModal} />;
    } else if ("account-delete") {
      return <AccountDelete setShowModal={props.setShowModal} />;
    }
  };

  const useDraft = (draftData: any) => {
    console.log(draftData);
    setUseDraftText(draftData.content);
  };

  const saveTextModalRender = () => {
    return (
      <SaveText
        setSaveTextModal={setSaveTextModal}
        useDraft={useDraft}
        currentText={currentText}
      />
    );
  };

  const renderModal = () => {
    if (saveTextModal) {
      return saveTextModalRender();
    } else {
      return rootingModalRender();
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {props.showModal && (
        <motion.div
          className="modal-background"
          onClick={() => props.setShowModal(false)}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {renderModal()}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
