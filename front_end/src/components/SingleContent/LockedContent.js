import { useNavigate } from "react-router-dom";
import "./SingleContent.css";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import NoEncryptionGmailerrorredTwoToneIcon from '@mui/icons-material/NoEncryptionGmailerrorredTwoTone';

const LockedContent = ({
  id,
  number,
  title,
  description,
}) => {
  return (
    <>
      <div className="Locked"
                  style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid #fff",
                  boxShadow: "1px 1px 5px 1px green",
                  width:"auto"
                }}
      >
        <h2>Chapter <span>{number}</span> IS LOCKED</h2>
        <h3 className="title">{title}</h3>
        <h3>no description in Locked Chapter</h3>
        <div className="image-container">
          <img style={{width:"278px",height: "206px"}} src={`http://127.0.0.1:8000/api/image/${id}`} alt=""/>
          <NoEncryptionGmailerrorredTwoToneIcon className="lock-icon" style={{ fontSize:"200px" }} />
        </div>
      </div>
    </>
  );
};

export default LockedContent;