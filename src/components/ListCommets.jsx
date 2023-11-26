import Comment from './Comment'

function ListComments({ data = [], loading }) {
  return (
    <div className=''>
      {loading ? (
        <div>cargando</div>
      ) : data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <Comment {...item} />
          </div>
        ))
      ) : (
        <div className='text-center pt-32'>No hay comentarios</div>
      )}
    </div>
  )
}

export default ListComments
