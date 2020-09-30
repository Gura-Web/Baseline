import React from 'react';
import {Link} from 'react-router-dom';

import { TrashIcon, PenIcon } from '../../assets/images/index';
import { SelectBox, FreeWordInput, InputBig , InputDropdown, InputTextArea } from '../form';
import { InsertAddBtn } from '../btn';
import { CompanyDetailCard } from '../company';

interface Props {
    thisPage: string;
}

const CompanyInfoEdit:React.FC<Props> = props => {
    const isError = [
        {isEmpty1: false},
        {isEmpty2: false},
        {isEmpty3: false}
    ];
    const calendarObj = [
        {value: '1月'},
        {value: '2月'},
        {value: '3月'},
        {value: '4月'},
        {value: '5月'},
        {value: '6月'},
        {value: '7月'},
        {value: '8月'},
        {value: '9月'},
        {value: '10月'},
        {value: '11月'},
        {value: '12月'},
      ];
    const renderContents = () => {
        if(props.thisPage === 'step') {
            return (
                <>
                    <article className="contentBox contentBox--big step">
                        <h1 className="heading4">選考ステップ1</h1>
                        <div className="contentBox__wrap">
                            <InputBig type="string" labelTxt="タイトル" isRequired={true} placeholderTxt="例) エントリーシート" isError={isError} isIcon={false} />
                            <InputDropdown ttl="" selectObj={calendarObj}/>
                        </div>
                        <div className="input-txtarea">
                            <p className="input-txtarea__heading">本文</p>
                            <textarea placeholder="本文を記入"></textarea>
                        </div>
                        <div className="btn btn--delete"><img src={TrashIcon} alt=""/></div>
                    </article>
                    <article className="contentBox contentBox--big step">
                        <h1 className="heading4">選考ステップ2</h1>
                        <div className="contentBox__wrap">
                            <InputBig type="string" labelTxt="タイトル" isRequired={true} placeholderTxt="例) エントリーシート" isError={isError} isIcon={false} />
                            <InputDropdown ttl="" selectObj={calendarObj} />
                        </div>
                        <InputTextArea ttl="本文" placeholder="本文を記入"/>
                        <div className="btn btn--delete"><img src={TrashIcon} alt=""/></div>
                    </article>
                </>
            )
        } else if (props.thisPage === 'interview') {
            return (
                <>
                    <article className="contentBox contentBox--big interview">
                        <h1 className="heading4">面接の内容</h1>
                        <InputTextArea ttl="面接を受けた感想をお書きください" placeholder="アドバイスや指摘、気づいた点など"/>
                        <div className="btn btn--delete"><img src={TrashIcon} alt=""/></div>
                    </article>
                </>
            );
        } else if (props.thisPage === 'entry') {
            return (
                <>
                    <article className="contentBox contentBox--big entry">
                        <h1 className="heading4">エントリーシート</h1>
                        <InputBig className="mb42" type="string" labelTxt="タイトル" isRequired={true} placeholderTxt="例) エントリーシート" isError={isError} isIcon={false} />
                        <InputTextArea ttl="本文" placeholder="本文を記入"/>
                        <div className="btn btn--delete"><img src={TrashIcon} alt=""/></div>
                    </article>
                    <article className="contentBox contentBox--big entry">
                        <InputBig className="mb42" type="string" labelTxt="タイトル" isRequired={true} placeholderTxt="例) エントリーシート" isError={isError} isIcon={false} />
                        <InputTextArea ttl="本文" placeholder="本文を記入"/>
                        <div className="btn btn--delete"><img src={TrashIcon} alt=""/></div>
                    </article>
                </>
            );
        }
    }

    const renderSummary = () => {
        if(props.thisPage === 'step') {
            return (
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
            );
        } else if (props.thisPage === 'interview') {
            return (
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
                            <FreeWordInput isRequired={false} type="string" ttl="結果" placeholder="合格" />
                        </div>
                    </div>
                </article>
            );
        } else if (props.thisPage === 'entry') {
            return (
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
            );
        }
    }

    return(
        <>
        {props.thisPage === 'interview' && (
            <div className="insert-tab">
                <ol className="insert-tab__wrap">
                    <li className="insert-tab__item current">
                        <span>一次面接<img src={PenIcon} alt=""/></span>
                    </li>
                    <li className="insert-tab__item">二次面接</li>
                </ol>
                <button className="btn btn--plus"></button>
            </div>
        )}
        <main className="main company-info-edit">
            <div className="main__container">
                <Link to="/company-info" className="btn pageBack-link"><span className="heading4">情報一覧へ</span></Link>
                <div className="company-info-edit__container">
                    <div className="company-info-edit__left-col">
                        {renderSummary()}
                       {renderContents()}
                        <InsertAddBtn txt="項目を追加"/>
                    </div>
                    <CompanyDetailCard/>
                </div>
            </div>
        </main>
        </>
    );
};

export default CompanyInfoEdit