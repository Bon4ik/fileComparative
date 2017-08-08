export default function diff (file1, file2) {
    let o = file1.split('\n');
    let n = file2.split('\n');
    const ns = {};
    const os = {};

    for ( let i = 0; i < n.length; i++ ) {
        if ( ns[ n[i] ] == null )
        ns[ n[i] ] = { rows: [], o: null };
        ns[ n[i] ].rows.push( i );
    }

    for ( let i = 0; i < o.length; i++ ) {
        if ( os[ o[i] ] == null )
        os[ o[i] ] = { rows: [], n: null };
        os[ o[i] ].rows.push( i );
    }

    for ( let i in ns ) {
        if ( ns[i].rows.length === 1 && typeof(os[i]) !== "undefined" && os[i].rows.length === 1 ) {
        n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
        o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
        }
    }

    for ( let i = 0; i < n.length - 1; i++ ) {
        if ( n[i].text !== null && n[i+1].text === null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text === null && 
            n[i+1] === o[ n[i].row + 1 ] ) {
        n[i+1] = { text: n[i+1], row: n[i].row + 1 };
        o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
        }
    }

    for ( let i = n.length - 1; i > 0; i-- ) {
        if ( n[i].text !== null && n[i-1].text === null && n[i].row > 0 && o[ n[i].row - 1 ].text === null && 
            n[i-1] === o[ n[i].row - 1 ] ) {
        n[i-1] = { text: n[i-1], row: n[i].row - 1 };
        o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
        }
    }

    for(let i = 0; i < o.length; i += 1) {
        if(typeof(o[i]) === 'object') {
            n.map((item, index) => {
            if (typeof(item) === 'object' && o[i].text === item.text) {
                if (i - index > 0) {
                const addedList = [];
                for (let j = 0; j < i - index; j += 1) {
                    addedList.push('');
                }
                n = [...n.slice(0, index), ...addedList, ...n.slice(index, n.length)];
                }
                if (i - index < 0) {
                const addedList = [];
                for (let j = 0; j < (i - index) * -1; j += 1) {
                    addedList.push('');
                }
                    o = [...addedList, ...o];
                }
            }
            })
        }
    }

    const result = [];

    const maxIndex = n.length > o.length ? n.length : o.length;

    for (let i = 0; i < maxIndex; i++) {
        if (typeof(n[i]) === 'string' &&  typeof(o[i]) === 'string' && n[i] !== o[i] && n[i] !== '' && o[i] !== '') {
        result.push({
            id: i + 1,
            symbol: '*',
            text: `${o[i]}|${n[i]}`
        });
        } else if (typeof(n[i]) === 'object' &&  typeof(o[i]) === 'object') {
        result.push({
            id: i + 1,
            symbol: ' ',
            text: n[i].text
        });
        } else if (typeof(o[i]) === 'string' && (n[i] === undefined || n[i] === '')) {
        result.push({
            id: i + 1,
            symbol: '-',
            text: o[i]
        });
        } else {
        result.push({
            id: i + 1,
            symbol: '+',
            text: n[i]
        });
        }
    }

    return result;
}