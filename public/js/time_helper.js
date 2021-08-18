function GETDURATION(incoming_time) {
    console.log(Date(incoming_time))
    let now = Date.now().toLocaleString('en-US')
    let diff = Math.abs(Date(incoming_time) - now);
    console.log(diff)
    console.log(now)

    return diff
}