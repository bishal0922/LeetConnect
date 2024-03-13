import { Avatar, Box, Chip, Grid, Link, Typography, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Cake, Work, School, Home, TagFaces } from '@mui/icons-material';
import PropTypes from 'prop-types';

const ProfileDetails = ({ profile }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
      <Avatar src={profile.avatar} sx={{ width: 128, height: 128, mb: 2 }} alt="User Avatar" />
      <Typography variant="h4" gutterBottom>{profile.name}</Typography>
      <Typography variant="subtitle1" gutterBottom>{profile.email}</Typography>
      
      {/* Personal and Contact Information */}
      <Paper elevation={3} sx={{ mt: 2, width: '100%', p: 2 }}>
        <List>
          {profile.birthday && (
            <ListItem>
              <ListItemIcon><Cake /></ListItemIcon>
              <ListItemText primary="Birthday" secondary={formatDate(profile.birthday)} />
            </ListItem>
          )}
          {profile.country && (
            <ListItem>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Country" secondary={profile.country} />
            </ListItem>
          )}
          {profile.company && (
            <ListItem>
              <ListItemIcon><Work /></ListItemIcon>
              <ListItemText primary="Company" secondary={profile.company} />
            </ListItem>
          )}
          {profile.school && (
            <ListItem>
              <ListItemIcon><School /></ListItemIcon>
              <ListItemText primary="School" secondary={profile.school} />
            </ListItem>
          )}
        </List>
      </Paper>

      {/* About Me Section */}
      {profile.about && (
        <Paper elevation={3} sx={{ mt: 2, p: 2, width: '100%' }}>
          <Typography variant="h6">About Me</Typography>
          <Typography variant="body1">{profile.about}</Typography>
        </Paper>
      )}

      {/* Skills Section */}
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Typography variant="h6">Skills</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.5 }}>
          {profile.skillTags.map((tag, index) => (
            <Chip key={index} icon={<TagFaces />} label={tag} />
          ))}
        </Box>
      </Box>

      {/* Social Links */}
      <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
        {profile.gitHub && (
          <Grid item>
            <Link href={profile.gitHub} target="_blank">GitHub</Link>
          </Grid>
        )}
        {profile.twitter && (
          <Grid item>
            <Link href={profile.twitter} target="_blank">Twitter</Link>
          </Grid>
        )}
        {profile.linkedIN && (
          <Grid item>
            <Link href={profile.linkedIN} target="_blank">LinkedIn</Link>
          </Grid>
        )}
        {profile.website && profile.website.map((site, index) => (
          <Grid item key={index}>
            <Link href={site} target="_blank">Website {index + 1}</Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
// Define expected prop types
ProfileDetails.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string,
    avatar: PropTypes.string,
    birthday: PropTypes.string,
    country: PropTypes.string,
    company: PropTypes.string,
    school: PropTypes.string,
    skillTags: PropTypes.arrayOf(PropTypes.string),
    about: PropTypes.string,
    gitHub: PropTypes.string,
    twitter: PropTypes.string,
    linkedIN: PropTypes.string,
    website: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
export default ProfileDetails;
