
'use client';

import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'https://provinces.open-api.vn/api';

interface Option {
  value: string;
  label: string;
}

interface AddressApiResponse {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    phone_code: number;
    districts?: AddressApiResponse[];
    wards?: AddressApiResponse[];
}

const mapToOptions = (items: AddressApiResponse[]): Option[] => {
  if (!items) return [];
  return items.map(item => ({ value: String(item.code), label: item.name }));
};

export function useAddress() {
  const [cities, setCities] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [wards, setWards] = useState<Option[]>([]);

  const [cityCode, setCityCode] = useState<string | null>(null);
  const [districtCode, setDistrictCode] = useState<string | null>(null);
  
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  const fetchCities = useCallback(async () => {
    setLoadingCities(true);
    try {
      const response = await fetch(`${API_BASE_URL}/`);
      const data: AddressApiResponse[] = await response.json();
      setCities(mapToOptions(data));
    } catch (error) {
      console.error('Failed to fetch cities:', error);
      setCities([]);
    } finally {
        setLoadingCities(false);
    }
  }, []);

  const fetchDistricts = useCallback(async (code: string) => {
    setLoadingDistricts(true);
    setDistricts([]);
    setWards([]);
    try {
      const response = await fetch(`${API_BASE_URL}/p/${code}?depth=2`);
      const data: AddressApiResponse = await response.json();
      setDistricts(mapToOptions(data.districts || []));
    } catch (error) {
      console.error('Failed to fetch districts:', error);
      setDistricts([]);
    } finally {
      setLoadingDistricts(false);
    }
  }, []);

  const fetchWards = useCallback(async (code: string) => {
    setLoadingWards(true);
    setWards([]);
    try {
      const response = await fetch(`${API_BASE_URL}/d/${code}?depth=2`);
      const data: AddressApiResponse = await response.json();
      setWards(mapToOptions(data.wards || []));
    } catch (error) {
      console.error('Failed to fetch wards:', error);
      setWards([]);
    } finally {
      setLoadingWards(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  useEffect(() => {
    if (cityCode) {
      fetchDistricts(cityCode);
    }
  }, [cityCode, fetchDistricts]);

  useEffect(() => {
    if (districtCode) {
      fetchWards(districtCode);
    }
  }, [districtCode, fetchWards]);

  return {
    cities,
    districts,
    wards,
    setCityCode,
    setDistrictCode,
    loadingCities,
    loadingDistricts,
    loadingWards
  };
}
