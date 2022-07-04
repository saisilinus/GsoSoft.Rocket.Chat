import { Accordion, Box, CheckBox } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
import React, { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';

import CityData from '../../../public/json_data/geo_location.json';
import Page from '../Page';
import ProfileHeader from '../ProfileHeader/ProfileHeader';

type Props = {
	title: string;
	id: string;
	handleRouteBack: Function;
	children: ReactNode;
};

const AddressPicker = ({ title, id, handleRouteBack, children }: Props): ReactElement => {
	const [checkedItem, setCheckedItem] = useState('');
	const [selectedDistricts, setSelectedDistricts] = useState<Record<string, any>[] | undefined>([]);
	const [checkedDistrict, setCheckedDistrict] = useState('');
	const t = useTranslation();

	useEffect(() => {
		// The first city is checked by default.
		if (CityData.length) {
			setCheckedItem(CityData[0].displayName);
		}
	}, []);

	useMemo(() => {
		CityData.map((city) => {
			if (city.displayName === checkedItem) {
				setSelectedDistricts(city.children);
			}
			return null;
		});
	}, [checkedItem]);

	return (
		<Page id={id}>
			{/* @ts-ignore */}
			<ProfileHeader title={title} handleRouteBack={handleRouteBack} />
			<Page.ScrollableContentWithShadow>
				<Accordion style={{ margin: '15px 0' }}>
					{/* @ts-ignore */}
					<Accordion.Item title={t('gso_hallOfFamePage_cityText')} defaultExpanded>
						{CityData.slice(0, 10).map((city, index) => (
							<Box key={index} display='flex' style={{ marginBottom: '10px' }}>
								<CheckBox checked={checkedItem === city.displayName} onClick={(): void => setCheckedItem(city.displayName)} />
								<p style={{ marginLeft: '8px' }}>{city.displayName}</p>
							</Box>
						))}
					</Accordion.Item>
					{children}
					{/* @ts-ignore */}
					<Accordion.Item title={t('gso_hallOfFamePage_cityText')} defaultExpanded>
						{selectedDistricts?.length ? (
							selectedDistricts.map((district, index) => (
								<Box key={index} display='flex' style={{ marginBottom: '10px' }}>
									<CheckBox
										checked={checkedDistrict === district.displayName}
										onClick={(): void => setCheckedDistrict(district.displayName)}
									/>
									<p style={{ marginLeft: '8px' }}>{district.displayName}</p>
								</Box>
							))
						) : (
							<div>There are No Districts for this city.</div>
						)}
					</Accordion.Item>
				</Accordion>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default AddressPicker;
