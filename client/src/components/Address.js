import React, { memo, useEffect, useState } from 'react';
import { Select, InputReadOnly } from '../components';
import { apiGetPublicProvinces, apiGetPublicDistrict } from '../services';
import { useSelector } from 'react-redux';

const Address = ({ setPayload, invalidFields, setInvalidFields }) => {

    
    const { dataEdit } = useSelector(state => state.post)
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [reset, setReset] = useState(false);

    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(',')
            let foundProvince = provinces?.length > 0 && provinces?.find(item => item.name === addressArr[addressArr?.length - 1]?.trim())
            setProvince(foundProvince ? foundProvince?.code : '')
        }
    }, [provinces, dataEdit])
    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(',')
            let foundDistrict = districts?.length > 0 && districts?.find(item => item.name === addressArr[addressArr?.length - 2]?.trim())
            setDistrict(foundDistrict ? foundDistrict?.code : '')
        }
    }, [districts, dataEdit])

    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces();
            if (response.status === 200) {
                setProvinces(response.data);
            }
        };
        fetchPublicProvince();
    }, []);

    useEffect(() => {
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province);
            if (response.status === 200) {
                setDistricts(response.data?.districts);
            }
        };
        if (province) {
            fetchPublicDistrict();
        }
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province]);

    // 🔥 Ép kiểu code về string để so sánh chính xác
    const selectedProvince = provinces?.find(item => String(item.code) === String(province));
    const selectedDistrict = districts?.find(item => String(item.code) === String(district));

    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            address: `${selectedDistrict ? `${selectedDistrict.name}, ` : ''}${selectedProvince ? selectedProvince.name : ''}`,
            province: selectedProvince ? selectedProvince.name : ''
        }))
    }, [province, district])

    return (
        <div>
            <h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Select
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        type="province"
                        value={province}
                        setValue={setProvince}
                        options={provinces}
                        label="Tỉnh/Thành phố"
                    />
                    <Select
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        reset={reset}
                        type="district"
                        value={district}
                        setValue={setDistrict}
                        options={districts}
                        label="Quận/Huyện"
                    />
                </div>
                <InputReadOnly 
                        label='Địa chỉ chính xác' 
                        value={`${selectedDistrict ? `${selectedDistrict.name}, ` : ''}${selectedProvince ? selectedProvince.name : ''}`} 
                    />
            </div>
        </div>
    );
};

export default memo(Address)