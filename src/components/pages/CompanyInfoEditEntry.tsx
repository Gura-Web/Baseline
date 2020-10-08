import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { SelectBox, FreeWordInput, InputWindowListEntry } from '../form';
import { InsertAddBtn } from '../btn';
import { CompanyDetailCard } from '../company';
import { AnimatePresence,motion } from 'framer-motion';



const CompanyInfoEditEntry:React.FC = props => {


    let [inputWindow, setInputWindow] = useState([
        {id: 1,},
    ]);
    let inputLength = inputWindow.length;

    const createInputWindow = () => {
        if(inputLength < 10) {
            setInputWindow([
                ...inputWindow,
                { id: inputLength + 1, },
            ])
        }
    }

    return(
            <main className="main company-info-edit">
                
                <div className="main__container">
                    <Link to="/company-info" className="btn pageBack-link"><span className="heading4">情報一覧へ</span></Link>
                    <div className="company-info-edit__container">
                        <div className="company-info-edit__left-col">

                            <article className="contentBox contentBox--big">
                                <h1 className="heading4">概要</h1>
                                <div className="label-input mb16">
                                    <p className="label-input__txt">選考種類<span className="cAttention">*</span></p>
                                    <SelectBox />
                                </div>
                                <div className="contentBox__flex">
                                    <div className="label-input">
                                        <p className="label-input__txt">応募職種<span className="cAttention">*</span></p>
                                        <SelectBox />
                                    </div>
                                    <div className="label-input">
                                        <FreeWordInput isRequired={true} type="string" ttl="その他" placeholder="職種を入力" />
                                    </div>
                                </div>
                            </article>

                            <InputWindowListEntry obj={inputWindow}/>

                            <InsertAddBtn txt="項目を追加" click={createInputWindow} />
                        </div>
                        <CompanyDetailCard/>
                    </div>
                </div>
            </main>
    );
};

export default CompanyInfoEditEntry