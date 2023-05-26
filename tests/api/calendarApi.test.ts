import calendarApi from '../../src/api/calendarApi';

describe('Pruebas en el calendarApi', () => { 
  test('debe tener la configaración por defecto', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
  })

  test('debe tener el x-token en el header de todas las peticiones', async() => {
    const token='ABC-123-XYZ'
    localStorage.setItem('token',token)
    const resp = await calendarApi.get('/auth')
                            .then(res=>res)
                            .catch(res=>res)

    expect(resp.config.headers['x-token']).toBe(token)
  })
  
})