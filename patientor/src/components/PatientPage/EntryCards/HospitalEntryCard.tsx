import { HospitalEntry } from '../../../types';

import DiagnosisCodes from '../DiagnosisCodes';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntryCard = ({
  entry,
  diagnosisMap,
}: {
  entry: HospitalEntry;
  diagnosisMap: Record<
    string,
    {
      diagnosis: string;
      latin: string;
    }
  >;
}) => {
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
          <DiagnosisCodes entry={entry} diagnosisMap={diagnosisMap} />
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
