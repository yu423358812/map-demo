import styled from 'styled-components';

export const HomeWrapper = styled.div`
    padding-top: 20px;
    padding-left: 5px;
    .geosuggest {
    font-size: 16px;
    position: relative;
    width: 100%;
    text-align: left;
    }
    .geosuggest__input {
    width: 100%;
    border: 2px solid transparent;
    box-shadow: 0 0 1px #3d464d;
    padding: 7px 1em;
    -webkit-transition: border 0.2s, box-shadow 0.2s;
            transition: border 0.2s, box-shadow 0.2s;
    }
    .geosuggest__input:focus {
    border-color: #267dc0;
    box-shadow: 0 0 0 transparent;
    }
    .geosuggest__suggests {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 25em;
    padding: 0;
    margin-top: -1px;
    background: #fff;
    border: 2px solid #267dc0;
    border-top-width: 0;
    overflow-x: hidden;
    overflow-y: auto;
    list-style: none;
    z-index: 5;
    -webkit-transition: max-height 0.2s, border 0.2s;
            transition: max-height 0.2s, border 0.2s;
    }
    .geosuggest__suggests--hidden {
    max-height: 0;
    overflow: hidden;
    border-width: 0;
    }
    
    /**
     * A geosuggest item
     */
    .geosuggest__item {
    font-size: 18px;
    font-size: 1rem;
    padding: .5em .65em;
    cursor: pointer;
    }
    .geosuggest__item:hover,
    .geosuggest__item:focus {
    background: #f5f5f5;
    }
    .geosuggest__item--active {
    background: #267dc0;
    color: #fff;
    }
    .geosuggest__item--active:hover,
    .geosuggest__item--active:focus {
    background: #ccc;
    }
    .geosuggest__item__matched-text {
    font-weight: bold;
    }

    /* search button css */
    .searchBtn {
        margin-left: 5px;
        height: 40px;
    }
`;

export const GoogleSearchMap = styled.div`
    margin-top: 20px;
    padding: 0px 10px;
`;

export const InfoText = styled.div`
    .infoAddressText {
        font-size: medium;
        margin-bottom: 5px;
    }
    .infoSaveText {
        color: red;
        text-align: center;
    }
    .textUnderline {
        display: inline-block;
        border-bottom: 0.5px solid red;
        cursor: pointer;
    }
    .textUnderline:active{
        color: black;
    }
`;