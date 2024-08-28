import { HealthCheckEntry } from '../../../types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const HealthCheckEntryCard = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2, marginTop: 2 }}>
      <CardContent sx={{ marginLeft: -1.5, marginTop: -4, marginBottom: -2 }}>
        <div>
          <h3>
            {entry.date} <MedicalServicesIcon />
          </h3>
          <p>
            <em>{entry.description}</em>
          </p>
          <p>
            <FavoriteIcon
              color={
                entry.healthCheckRating === 0
                  ? 'success'
                  : entry.healthCheckRating === 1
                  ? 'warning'
                  : entry.healthCheckRating === 2
                  ? 'error'
                  : 'error'
              }
            />
          </p>
          Diagnosed by {entry.specialist}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthCheckEntryCard;
