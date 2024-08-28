import { HospitalEntry } from '../../../types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntryCard = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Card
      variant="outlined"
      sx={{ marginBottom: 2, marginTop: 2, borderColor: 'black' }}
    >
      <CardContent sx={{ marginLeft: -1.5, marginTop: -4, marginBottom: -2 }}>
        <div>
          <h3>
            {entry.date} <LocalHospitalIcon />
          </h3>
          <p>
            <em>{entry.description}</em>
          </p>
          <p>
            {entry.discharge.date} {entry.discharge.criteria}
          </p>
          Diagnosed by {entry.specialist}
        </div>
      </CardContent>
    </Card>
  );
};

export default HospitalEntryCard;
