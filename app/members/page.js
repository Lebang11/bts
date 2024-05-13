const Members = () => {
    return ( 
        <div className="ms-2 container d-flex flex-column justify-content-start align-items-start">
          <h1 className="display-4 text-secondary">
            Members
          </h1>
          <table className="table table-dark table-borderless">
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Surname</th>
                <th scope='col'>Student email</th>
                <th scope='col'>Phone Number</th>
                <th className='text-primary' scope='col'>Role</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <th scope='row'>1</th>
                    <td>Lebang</td>
                    <td>Nong</td>
                    <td>lnong023@student.wethinkcode.co.za</td>
                    <td>0623997680</td>
                    
                    <td>Evaluator
                    </td>
                    
              </tr>
              <tr>
                <th scope='row'>2</th>
                    <td>John</td>
                    <td>Jones</td>
                    <td>jjones023@student.wethinkcode.co.za</td>
                    <td>0823131549</td>

                    <td>Student
                    </td>
                    
              </tr>
              <tr>
                <th scope='row'>3</th>
                    <td>Rethabile</td>
                    <td>Malete</td>
                    <td>rmalete023@student.wethinkcode.co.za</td>
                    <td>0722272188</td>

                    <td>Evaluator
                    </td>
                    
              </tr>
                    
            </tbody>
          </table>
             
        </div>
     );
}
 
export default Members;