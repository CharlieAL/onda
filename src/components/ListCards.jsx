import Card from './Card'

function ListCards({ data = [], loading, update = false }) {
  return (
    <div className=''>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            {!loading ? (
              <Card
                update={update}
                liked_by_user={1}
                {...item}
              />
            ) : (
              <div>cargando</div>
            )}
          </div>
        ))
      ) : (
        <div className='text-center pt-32'>No hay Eventos</div>
      )}
    </div>
  )
}

export default ListCards
