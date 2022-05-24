import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { StatisticItem } from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import { fetchData } from './dashboardSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  loading: {
    position: 'absolute!important' as any,
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { dashboard } = useAppSelector((state) => state);
  const { loading, statistics, highestStudentList, lowestStudentList, rankingByCityList } =
    dashboard;

  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading} />}
      {/* Statistics section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<MaleIcon fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<FemaleIcon fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<ThumbUpAltIcon fontSize="large" color="primary" />}
            label="mark >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<ThumbDownIcon fontSize="large" color="primary" />}
            label="mark <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>
      {/* Students ranking section */}
      <Box mt={4}>
        <Typography variant="h4">All Students</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Widget title="Students with highest mark">
              <StudentRankingList studentList={highestStudentList} />
            </Widget>
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Widget title="Students with lowest mark">
              <StudentRankingList studentList={lowestStudentList} />
            </Widget>
          </Grid>
        </Grid>
      </Box>
      {/* Ranking by city */}
      <Box mt={4}>
        <Typography variant="h4">Students Ranking By City</Typography>
        <Grid container spacing={3}>
          {rankingByCityList.map((city) => (
            <Grid key={city.cityId} item xs={12} md={6} lg={4} xl={3}>
              <Widget title={city.cityName}>
                <StudentRankingList studentList={city.rankingList} />
              </Widget>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
