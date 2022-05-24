import { Box, Button, LinearProgress, Pagination, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import studentAPI from 'api/studentAPI';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentFilter from '../components/StudentFilter';
import StudentTable from '../components/StudentTable';
import { studentActions } from '../studentSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paginationContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2, 0),
  },
  loading: {
    position: 'absolute!important' as any,
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function ListPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const {
    list: studentList,
    pagination,
    filter,
    loading,
  } = useAppSelector((state) => state.student);

  const cityList = useAppSelector(selectCityList);
  const cityMap = useAppSelector(selectCityMap);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const onSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const onChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const onRemove = async (student: Student) => {
    try {
      await studentAPI.remove(student.id || '');
      dispatch(studentActions.setFilter({ ...filter }));
    } catch (error) {
      console.log('Failed to remove a student', error);
    }
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Link to="/admin/students/add" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add New Student
          </Button>
        </Link>
      </Box>

      <Box mb="3">
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onSearchChange={onSearchChange}
          onChange={onChange}
        />
      </Box>

      <StudentTable cityMap={cityMap} studentList={studentList} onRemove={onRemove} />

      <Box className={classes.paginationContainer}>
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
