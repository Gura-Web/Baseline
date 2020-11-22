import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LinkIcon } from "../../assets/images/index";
import { Secondary } from "../Atoms/TextInput";
import { ImageUpload, SelectSecondary } from "../Atoms/Input/index";
import { PrefectureSelector } from "../Organisms/Input";
import { ActionBtn } from "../Atoms/Btn";
import { motion } from "framer-motion";
import { pageTransitionNormal } from "../../assets/script/pageTransition";
import { detailCompany, editCompany } from "../../assets/script/index";
import axios from "axios";

interface Props {
  match?: any;
}

const CompanyInsert: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [companyData, setCompanyData] = useState<any>([]);
  const companyId = props.match.params.id;
  const history = useHistory();
  useEffect(() => {
    if (companyId !== "register") {
      detailCompany(companyId).then((getData: any) => {
        if (getData) {
          setCompanyData(getData.data);
          setLoading(true);
          console.log(getData.data);
        }
      });
    } else {
      setLoading(true);
    }
  }, []);

  const isError = [
    { isEmpty1: false },
    { isEmpty2: false },
    { isEmpty3: false },
  ];
  const employeesObj = [
    { value: "100~200人" },
    { value: "200~300人" },
    { value: "300~400人" },
    { value: "400~500人" },
  ];

  const formOnClickHandler = (e: any) => {
    const forms = document.forms[0];
    const company_name = forms.company_name;
    const furigana = forms.furigana;
    const logo = forms.logo.files[0];
    const url = forms.url;
    const business = forms.business.value;
    const employee_number = forms.employee_number.value;
    const prefArray: number[] = [];
    const fr = new FileReader();

    // 都道府県
    const prefecture = document
      .querySelector(".prefecture-accordion")
      ?.querySelectorAll('input[type="checkbox"]')!;
    prefecture.forEach((item: any) => {
      if (item.checked) {
        const numberPref: number = Number(item.dataset.key);
        prefArray.push(numberPref);
      }
    });

    const sendObj: any = {
      frigana: furigana.value,
      company_name: company_name.value,
      business_description: business,
      prefecture_id: prefArray,
      number_of_employees: 1000,
      logo_image: "",
      company_url: url.value,
    };
    fr.onloadend = function () {
      sendObj.logo_image = String(fr.result);
    };
    fr.readAsDataURL(logo);
    console.log(sendObj);
    if (companyId !== "register") {
      // insertCompany(sendObj);
      editCompany(companyId, sendObj);
    } else {
      editCompany(companyId, sendObj);
    }
  };

  const renderDOM = () => {
    return (
      <motion.section
        className="app-main company-insert single"
        initial="out"
        animate="in"
        exit="out"
        variants={pageTransitionNormal}
      >
        <button className="btn pageBack-link" onClick={() => history.goBack()}>
          <span className="heading4">戻る</span>
        </button>
        <h2 className="heading1">企業登録</h2>
        <div className="companyInsert-window">
          <form action="#" method="POST">
            <Secondary
              defaultValue={companyData.company_name}
              name="company_name"
              type="text"
              labelTxt="企業名"
              isRequired={true}
              isRequiredTxt={true}
              placeholderTxt="ビジョナル株式会社"
              isError={isError}
              isIcon={false}
            />
            <Secondary
              defaultValue={companyData.frigana}
              name="furigana"
              type="text"
              labelTxt="フリガナ"
              isRequired={true}
              isRequiredTxt={true}
              placeholderTxt="カブシキガイシャビジョナル"
              isError={isError}
              isIcon={false}
            />

            <ImageUpload name={"logo"} imageData={companyData.logo_image_url} />

            <Secondary
              defaultValue={companyData.company_url}
              name="url"
              type="text"
              labelTxt="企業URL"
              isRequired={true}
              isRequiredTxt={true}
              placeholderTxt="https://www.google.com"
              isError={isError}
              isIcon={true}
              iconUrl={LinkIcon}
            />
            <Secondary
              defaultValue={companyData.business_description}
              name="business"
              type="text"
              labelTxt="事業内容"
              isRequired={false}
              isRequiredTxt={false}
              placeholderTxt="UI/UXデザイン、ビジネスモデルデザイン、ソフトウェア開発"
              isError={isError}
              isIcon={false}
            />

            <PrefectureSelector companyPref={companyData.prefectures} />

            <SelectSecondary
              name="employee_number"
              ttl="従業員数"
              selectObj={employeesObj}
            />

            <div className="company-insert__enter">
              <p className="company-insert__cancel">キャンセル</p>
              <ActionBtn
                type="submit"
                txt="登録する"
                isPlus={false}
                linkUrl="#"
                clickFunc={formOnClickHandler}
              />
            </div>
          </form>
        </div>
      </motion.section>
    );
  };
  return <>{loading && renderDOM()}</>;
};

export default CompanyInsert;
