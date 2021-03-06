import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { AboutBar } from "../../Organisms/CompanyDetail";
import { PostStudent } from "../../Molecules/Card/index";
import { Primary } from "../../Atoms/TextInput/index";
import { CheckboxWithText } from "../../Molecules/Input";
import { ActionBtn, RoundedBtn } from "../../Atoms/Btn";
import { Modal } from "../../Organisms/Modal";
import { motion } from "framer-motion";
import { pageTransitionNormal } from "../../../assets/script/pageTransition";
import { rikuma } from "../../../assets/images";
import {
  detailCompany,
  companyDetailUser,
  getMyData,
} from ".././../../assets/script/";
interface Props {
  myData: any;
  match?: any;
}

const CompanyInfo: React.FC<Props> = (props) => {
  const history = useHistory();
  const companyId = Number(props.match.params.id);
  const [companyData, setCompanyData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [myData, setMyData] = useState<any>();
  const [myCompanyInfo, setMyCompanyInfo] = useState([]);

  useEffect(() => {
    detailCompany(companyId).then((getData: any) => {
      if (getData.data) {
        setCompanyData({
          ...getData.data,
        });
      }
    });
    getMyData()
      .then((mydata: any) => {
        if (mydata.data) {
          setMyData({
            profile: {
              id: mydata.data.id,
              first_name: mydata.data.first_name,
              last_name: mydata.data.last_name,
              student_number: mydata.data.student_number,
              year_of_graduation: mydata.data.year_of_graduation,
              icon_image_path: mydata.data.icon_image_path,
              sex: mydata.data.sex,
              email: mydata.data.email,
              desired_occupations: mydata.data.desired_occupations,
            },
          });
          console.log(mydata.data);
          return mydata.data;
        }
      })
      .then((userData) => {
        companyDetailUser(companyId, userData.id).then((getData: any) => {
          console.log(getData.data.user);
          const myCompanyData = getData.data.user.company_information.filter(
            (item: any) => {
              return item.company_id == companyId;
            }
          );
          console.log(myCompanyData);
          setMyCompanyInfo(myCompanyData);
          setLoading(true);

          // console.log(myCompanyData);
          // myCompanyData.forEach((item: any) => {
          //   setMyCompanyInfo({
          //     internship: item.internship.name,
          //   });
          // });
        });
      });
  }, []);
  const renderDOM = () => {
    return (
      <>
        <motion.section
          className="app-main company-info single"
          initial="out"
          animate="in"
          exit="out"
          variants={pageTransitionNormal}
        >
          <button
            className="btn pageBack-link"
            onClick={() => history.goBack()}
          >
            <span className="heading4">企業詳細へ</span>
          </button>
          <AboutBar
            companyData={companyData}
            thisPage="info"
            companyId={companyId}
            hasActionBtn={false}
          />
          <div className="contentBox2">
            <h2 className="heading4">共通情報</h2>
            <div className="company-info__form">
              <form action="">
                <Primary
                  name="graduation_year"
                  type="number"
                  ttl="卒業年次"
                  placeholder="22"
                  unit="卒"
                  isRequired={false}
                  maxLength={3}
                />
                <div>
                  <CheckboxWithText
                    type="checkbox"
                    txt="あなたはこの企業に入社予定ですか？"
                  />
                  <RoundedBtn txt="保存" />
                </div>
              </form>
            </div>
          </div>

          <div className="contentBox2 added-info">
            <div>
              <h2 className="heading4">あなたが記入した情報</h2>
              <ActionBtn
                type="button"
                txt="情報を追加する"
                isPlus={false}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </div>
            <ul className="company-info__added">
              {myCompanyInfo.map((item: any) => {
                let data = [];
                // if (item.interviews) data.push(item.interviews);
                console.log(item.interviews);

                return (
                  <li>
                    <PostStudent
                      category_id={1}
                      student_id={myData.profile.id}
                      ttl={item.internship.name}
                      isPass={false}
                      job={myData.profile.desired_occupations}
                      icon={
                        myData.profile.icon_image_url
                          ? myData.profile.icon_image_url
                          : rikuma
                      }
                      userName={
                        myData.profile.first_name +
                        " " +
                        myData.profile.last_name
                      }
                    />
                  </li>
                );
              })}
              {/* <li>
                <PostStudent
                  category_id={1}
                  student_id={1}
                  ttl="本選考 (22卒)"
                  isPass={false}
                  job="デザイナー"
                  icon="a"
                  userName="山本 仁"
                />
              </li> */}
            </ul>
          </div>
        </motion.section>
        <Modal
          type="select-post-category"
          showModal={showModal}
          setShowModal={setShowModal}
          companyId={companyId}
        />
      </>
    );
  };
  return <>{loading && renderDOM()}</>;
};

export default CompanyInfo;
