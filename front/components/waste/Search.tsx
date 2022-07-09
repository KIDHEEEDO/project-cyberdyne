import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import WasteInfo from "../../public/wasteInfo.json";

interface WasteInfo {
    region: string[];
    name: string[];
}

const regionData = Array.from(new Set(WasteInfo.map((data) => data.region)));
const nameData = Array.from(new Set(WasteInfo.map((data) => data.name)));

const Search = ({ mapData, setMapData }) => {
    const [region, setRegion] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [inputRegion, setInputRegion] = useState('');
    const [inputName, setInputName] = useState('');
    const [newNameData, setNewNameData] = useState<string[]>(nameData);
    const isRegionValid = (region === null)

    useEffect(() => {
        setRegion(null);
        setName(null);
    }, [mapData])

    useEffect(() => {
        const newData = WasteInfo.filter((data) => data.region === region).map((data) => data.name)
        setNewNameData(newData)
        setName(null);
    }, [region])

    useEffect(() => {
        if (name) {
            const map = WasteInfo.filter((data) => data.region === region && data.name === name)
            setMapData(map)
        }
    }, [name])
    
    return (
        <Wrapper>
            <Autocomplete
                value={region}
                onChange={(event: any, newValue: string | null) => {
                    setRegion(newValue);
                }}
                inputValue={inputRegion}
                onInputChange={(event, newInputValue) => {
                    setInputRegion(newInputValue);
                }}
                id="controllable-states-demo"
                options={regionData}
                sx={{ width: 280 }}
                renderInput={(params) => <TextField {...params} label="시/도" />}
            />
            <Autocomplete
                value={name}
                onChange={(event: any, newValue: string | null) => {
                    setName(newValue);
                }}
                inputValue={inputName}
                onInputChange={(event, newInputValue) => {
                    setInputName(newInputValue);
                }}
                id="controllable-states-demo"
                options={newNameData}
                sx={{ width: 280 }}
                renderInput={(params) => <TextField {...params} label="시/군/구" />}
                disabled={isRegionValid}
            />
        </Wrapper>
    );
}

export default Search;

const Wrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
`;