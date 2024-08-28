import { OccupationalHealthcareEntry } from '../../../types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthCheckEntryCard = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2, marginTop: 2 }}>
      <CardContent sx={{ marginLeft: -1.5, marginTop: -4, marginBottom: -2 }}>
        <div>
          <h3>
            {entry.date} <WorkIcon />{' '}
          </h3>
          <p>
            <em>{entry.description}</em>
          </p>
          <p></p>
          Diagnosed by {entry.specialist}
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthCheckEntryCard;
