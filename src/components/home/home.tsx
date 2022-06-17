import React, {FunctionComponent, useState} from 'react'
import {Produce} from "../produce/produce";
import style from './home.module.less';

export const Home: FunctionComponent = () => {
    return <div className={style.home}>
        <div>
            <h3>Relative pitch</h3>
            <p>ducks ducks ducks</p>
            <div className={style.divider}/>
            <Produce/>
        </div>
    </div>
}