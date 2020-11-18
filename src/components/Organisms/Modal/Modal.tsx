import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
}

const Modal: React.FC<Props> = (props) => {
  const [saveTextModal, setSaveTextModal] = useState<boolean>(false);
  const [draft, setDraft] = useState<any>();
  useEffect(() => {
    const url = "./draft.json";
    axios.get(url).then((res) => {
      const output = res.data;
      setDraft(output);
    });
  }, []);

  const rootingModalRender = () => {
    if (props.type === "activity-post") {
      return (
        <CommentWindow
          ttl="アクティビティを投稿"
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          setSaveTextModal={setSaveTextModal}
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
        />
      );
    } else if (props.type === "activity-edit") {
      return (
        <CommentWindow
          ttl="アクティビティを編集"
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          setSaveTextModal={setSaveTextModal}
        />
      );
    } else if (props.type === "activity-delete") {
      return <ActivityDelete setShowModal={props.setShowModal} />;
    } else if (props.type === "company-level") {
      return <LevelDesc setShowModal={props.setShowModal} />;
    } else if ("account-delete") {
      return <AccountDelete setShowModal={props.setShowModal} />;
    }
  };

  const saveTextModalRender = () => {
    return <SaveText setSaveTextModal={setSaveTextModal} draft={draft} />;
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