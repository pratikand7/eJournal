const EditProfile = ({ token }) => {

    return(
        <>
        <form action="">
            <input type="text" name="username" placeholder="username" />
            <input type="text" name="address" placeholder="address" />
            <input type="text" placeholder="Gender"></input>
            <button type="submit">Save Changes</button>
            <button type="reset">Cancel</button>
            <button type="button" onClick={handleDelete}>Delete Account</button>

        </form>
        </>
    )};