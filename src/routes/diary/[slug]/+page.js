// この型宣言は必須、この型宣言で返された値でなければ+page.svelteで受け取れない
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return { diary_id: params.slug }
}