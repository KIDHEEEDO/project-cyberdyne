import React, { useState} from 'react';
import ReportWasteStyle from "../../styles/ReportWaste.module.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const citys = ['서울시', '경기도']
const districts = ['강남구', '강서구', '강동구', '관악구', '성북구'];

export default function ControllableStates() {
  const [city, setCity] = useState<string | null>(citys[0]);
  const [district, setDistrict] = useState<string | null>(districts[0]);
  const [inputCity, setInputCity] = useState('');
  const [inputDistrict, setInputDistrict] = useState('');

  return (
    <div>
      <div className={ReportWasteStyle.input_wrapper}>
        <Autocomplete
          value={city}
          onChange={(event: any, newValue: string | null) => {
            setCity(newValue);
          }}
          inputValue={inputCity}
          onInputChange={(event, newInputValue) => {
            setInputCity(newInputValue);
          }}
          id="controllable-states-demo"
          options={citys}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="시/도" />}
        />
        <Autocomplete
          value={district}
          onChange={(event: any, newValue: string | null) => {
            setDistrict(newValue);
          }}
          inputValue={inputDistrict}
          onInputChange={(event, newInputValue) => {
            setInputDistrict(newInputValue);
          }}
          id="controllable-states-demo"
          options={districts}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="군/구" />}
        />
      </div>
    </div>
  );
}