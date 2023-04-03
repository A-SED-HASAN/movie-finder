import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetch from '../Hook/useFetch'
import {
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Button,
  Rating,
  Paper,
  TableRow,
} from '@mui/material'
import { v4 as uuid4 } from 'uuid'
const SingleMovie = () => {
  const { id } = useParams()
  const { isLoading, error, data: movie } = useFetch(`&i=${id}&plot=full`)

  const minToHour = (time) => {
    return `${
      Math.floor(time.split(' ')[0] / 60)
        ? Math.floor(time.split(' ')[0] / 60) + 'h'
        : ''
    } ${time.split(' ')[0] % 60 ? (time.split(' ')[0] % 60) + 'm' : ''}`
  }
  if (isLoading) {
    return <div className='loading'></div>
  }
  if (error.show) {
    return (
      <div className='page-error'>
        <h1>{error.msg}</h1>
        <Link to='/'>
          <Button variant='outlined'>back to movies</Button>
        </Link>
      </div>
    )
  }
  const {
    Poster: poster,
    Title: title,
    Plot: plot,
    Year: year,
    Runtime: length,
    Rated: rated,
    Director: director,
    Actors: actors,
    Writer: writer,
    imdbRating,
    imdbVotes,
    Type,
    Released,
    Genre,
    Ratings,
    Awards,
    Country,
    BoxOffice,
  } = movie

  function createData(title, names) {
    return { title, names }
  }

  const rows = [
    createData('Type', Type),
    createData(
      'Genre',
      Genre.split(',').map((item) => {
        return <div key={uuid4()}>{item}</div>
      })
    ),
    createData('Released', Released),
    createData('Director', director),
    createData('Actors', actors),
    createData('Writer', writer),
    createData(
      'IMDB',
      <div className='imdb'>
        <Rating
          name='customized-10'
          defaultValue={+imdbRating / 2}
          precision={0.1}
          max={5}
          readOnly
        />
        <span> {imdbRating}</span>
        <span> {imdbVotes} Votes</span>
      </div>
    ),
    createData(
      'Ratings',
      Ratings.map((item) => {
        const { Source, Value } = item
        return (
          <div key={uuid4()}>
            {Source} {Value}
          </div>
        )
      })
    ),
    createData('Awards', Awards),
    createData('BoxOffice', BoxOffice),
    createData('Country', Country),
  ]
  return (
    <section className='single-movie'>
      <img src={poster} alt={title} />
      <div className='single-movie-info'>
        <h2>{title}</h2>
        <span className='sub-title'>{year}</span>
        <span className='sub-title'>{rated}</span>
        <span className='sub-title'>{minToHour(length)}</span>
        <p>{plot}</p>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={uuid4()}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.title}
                  </TableCell>
                  <TableCell align='left'>{row.names}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Link to='/'>
        <Button variant='outlined'>back to movies</Button>
      </Link>
    </section>
  )
}

export default SingleMovie
