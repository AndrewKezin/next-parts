'use client';

import { useEffect, useState } from 'react';
import { Container, LegalInfo } from "@/components/shared";


export default function OfferPage() {
// const [text, setText] = useState<string>('');

// useEffect(() => {
//     fetch('/assets/docs/useragreement.txt')
//         .then((response) => response.text())
//         .then((data) => setText(data.replace(/\r\n|\r/g, '\n')))
//         .catch((error) => console.error('Error fetching the text file:', error));
// }, []);

    const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime consequuntur quisquam necessitatibus nisi aperiam a vitae officia culpa perferendis repellendus accusamus obcaecati atque odit voluptatem quaerat delectus, vero tenetur officiis.
    Tenetur dolores totam facilis voluptatem rem, incidunt ullam distinctio esse, maiores tempora, dignissimos eius enim deleniti. Consequatur esse reiciendis temporibus architecto illum voluptatem veniam autem quibusdam. Culpa in ullam hic.
    Veritatis fuga fugiat facere consequuntur placeat hic numquam doloribus totam ea perspiciatis porro et cupiditate possimus, dolor officia ipsa magni nulla quod praesentium animi! Omnis ea excepturi labore assumenda placeat.
    Minus numquam, a odio obcaecati veniam est unde corporis voluptatum? Nihil esse quo repellendus unde, quidem quod praesentium pariatur debitis sequi officia odio accusantium! Doloremque adipisci laudantium quidem sequi nesciunt?
    Perferendis in voluptas incidunt laudantium aut amet tempore dignissimos explicabo maxime voluptate, accusamus veniam sit culpa recusandae, laborum ratione perspiciatis illum nemo! Esse tenetur, expedita delectus nostrum reiciendis hic nihil.
    Exercitationem nostrum voluptas perspiciatis enim dignissimos rem delectus iusto, aliquid tenetur qui perferendis iste quas fugiat officia doloremque laborum optio sequi quos illo maxime inventore distinctio placeat alias! Error, fugit.
    Amet eius molestiae ipsam iste quas iure nihil. Dolorum accusamus reiciendis numquam. Deleniti magnam officia expedita autem qui ex in dicta vel ea eius repellendus inventore voluptatum, molestiae consequatur tenetur.
    Eaque laboriosam quod cumque ad fuga, quasi id neque, quidem minus doloribus molestiae culpa possimus quia, praesentium facere iure magni? Nobis aliquam dolores sequi cumque? Explicabo adipisci deserunt cupiditate sunt?
    Magnam eaque, optio asperiores velit rem ut molestias beatae fugiat explicabo vitae officiis quam consectetur perspiciatis nam necessitatibus earum esse vel. Perspiciatis quo quia quasi corporis dolorem labore molestias necessitatibus!
    Nesciunt eligendi saepe nam? Perspiciatis corrupti molestiae natus totam numquam sint cum vero eum magnam est iusto quo eaque ratione odio facilis itaque, veritatis expedita ab! Repellendus repudiandae quae dignissimos?
    Dolor beatae nemo consectetur tempora molestiae dolorem obcaecati, vel saepe numquam at eaque neque eos! Dolore at repellendus optio maiores sint tenetur illo, soluta est vero, maxime, aut atque nulla.
    Quam, quod dolorum doloremque odio minus nam omnis sunt minima beatae id, corrupti ut nemo odit impedit fuga nesciunt in assumenda aspernatur vitae accusantium. Sequi harum enim earum architecto cupiditate.
    Illo, quam amet, asperiores iste accusamus deserunt eligendi voluptas hic ratione maiores porro quasi exercitationem sed nam quibusdam aperiam voluptates temporibus, possimus nulla. Laudantium nulla corrupti vitae, ea tempore ducimus.
    Sit totam nihil repellat similique dolorem dolor eum deleniti, quia eaque voluptatem officiis odio optio aliquid, adipisci culpa iusto nulla, eveniet labore laudantium eius. Architecto quidem iure animi nobis illo?
    Ipsum facilis nulla officiis neque a cupiditate doloribus aspernatur sapiente doloremque nihil, pariatur tenetur dolorem quia, repellat harum expedita maxime consequuntur incidunt! Voluptate officiis ipsum laudantium nisi. Provident, in quidem!
    A quae sint ipsam sunt deleniti possimus porro dicta iste, dignissimos vitae fuga molestias, totam esse ad unde soluta officia corporis iure rerum, id facilis! Ut placeat reiciendis nesciunt ad?
    Qui iste aliquid suscipit nostrum quae? Dolorum maiores consequatur quaerat obcaecati hic odio harum fuga, illo placeat corrupti. Saepe, doloremque. Nostrum exercitationem, magnam sint minima tenetur laboriosam adipisci laudantium repellendus.
    Suscipit, earum iusto? Veritatis beatae aperiam quas sed magnam et aspernatur quidem similique id ipsum expedita, ex repudiandae. Nobis amet accusamus error doloremque dolore voluptates quas, quia ratione soluta cupiditate?
    Accusantium illo ratione, vero totam ipsam laudantium minus dolorem maiores corporis, molestiae placeat eligendi error voluptatem ut voluptate sit recusandae amet fuga consequatur quibusdam nihil quo, architecto aperiam! Vero, dolor.
    Nesciunt nulla neque alias quisquam deserunt. Quasi, voluptatibus commodi. Dolores, assumenda illo quaerat, inventore rem sit autem libero provident qui fugit temporibus quia, sed illum ut tempore. Dicta, consequuntur id.
    Libero animi dicta laboriosam praesentium illo tenetur nesciunt ea consequatur quam rem. Aliquam modi vero laborum facilis animi alias harum consequatur, in delectus labore optio! Excepturi nisi temporibus quasi voluptas.
    Iure eos blanditiis at dolor, itaque officia adipisci maiores exercitationem eveniet possimus. Reiciendis laboriosam minima aut amet iusto aperiam quos, aliquid incidunt culpa perferendis eius voluptate facilis pariatur temporibus ipsa.
    Velit facilis modi ea tenetur, accusamus laudantium iste error dolores quae ex doloremque voluptas incidunt? Laborum qui consectetur culpa nesciunt consequatur laudantium in doloremque sequi. Eligendi iusto repellat commodi dolore.
    Nisi veniam, autem quas laboriosam fuga magni modi eaque illo commodi consequatur corrupti, iure cum cupiditate in culpa earum. Ut cumque nobis ullam perferendis eveniet sapiente voluptas vel dolore exercitationem?
    Consectetur ipsa nobis iure, ducimus reprehenderit praesentium cum nemo est blanditiis iste reiciendis labore sit beatae ullam rem placeat debitis neque culpa rerum quasi magnam nesciunt dolore quod ipsam? Sunt?
    Maiores voluptas perferendis iste, vero reiciendis voluptates tempora magnam aperiam deleniti cupiditate incidunt commodi vitae itaque. Maiores voluptas laboriosam facere voluptatem suscipit quam, sint, modi ab delectus assumenda architecto perspiciatis.
    Ullam velit nihil illo incidunt voluptates itaque, quas iure perspiciatis. Soluta et magnam, architecto veniam qui nemo ipsa quod natus perspiciatis temporibus quo placeat unde! Ut qui nisi corporis sit!
    Quia doloribus error aliquam nemo, laudantium illo sit corrupti deserunt harum dolor commodi placeat quam atque omnis enim, quaerat, odit saepe consectetur fugit facilis quae adipisci distinctio! Labore, et illum.
    Blanditiis animi accusantium magni omnis suscipit molestiae facilis exercitationem sed eos maiores et cupiditate accusamus, est, iusto dolorem ex, aliquam adipisci quidem dicta repellat provident! Cum officia possimus molestias repudiandae.
    Corrupti inventore commodi illum officiis facere voluptatibus exercitationem, repellat magni, quam veniam quis odit! Aliquam est totam sint, consectetur neque dolorem aspernatur fuga molestias similique, libero reprehenderit quod labore in!
    Et corporis necessitatibus quia suscipit dolor repudiandae eum minima quo commodi assumenda eveniet reprehenderit debitis provident, molestiae iusto neque quam eligendi nemo cum adipisci eos, at accusamus, doloribus excepturi. Alias.
    Placeat, architecto odit provident omnis assumenda veniam error et sequi consectetur asperiores. Ratione autem, dolorem quaerat nesciunt sit hic cupiditate fuga alias temporibus nihil repellendus, repellat eligendi cum rem quibusdam.
    Inventore, maxime vel tenetur totam rerum temporibus blanditiis ipsa mollitia consequuntur nobis repellendus praesentium dicta molestias incidunt dolore necessitatibus distinctio explicabo laudantium! Earum nostrum repellendus quisquam incidunt id dicta praesentium!
    Veniam eligendi necessitatibus totam exercitationem voluptatum hic, harum cumque. Eligendi pariatur, minima natus est nihil libero cumque debitis nostrum sint, provident nulla placeat quis non, quidem nobis tempore ut! Expedita.
    Atque consectetur excepturi placeat. Dolores ducimus delectus eaque eveniet, suscipit inventore alias eius incidunt voluptate voluptates atque! Quasi, quis. Impedit, facilis. Architecto fugiat fuga nulla doloremque a praesentium sapiente ut.
    Corporis labore voluptatibus voluptate blanditiis provident doloribus harum, quo earum tempora esse, quia consequatur maiores corrupti est placeat velit. Harum ut sequi voluptate nemo repellendus at enim nam ipsa magni?
    Cum nemo recusandae minus quas reprehenderit officiis neque quam quod. Quis nesciunt suscipit officiis earum doloremque odit quibusdam labore porro dolorem, fugit natus, tempora eos voluptate nostrum veniam minus tempore?
    Voluptatem porro quo id totam iure repellendus vel mollitia sapiente voluptate incidunt nulla, eaque enim consequuntur recusandae perferendis illo expedita dicta cum, numquam dignissimos. Tempore veritatis inventore error quis ea!
    Corrupti, blanditiis dolore, sunt distinctio quam debitis eligendi ullam corporis autem minus fugit alias atque cum laborum. Eaque suscipit distinctio facilis quisquam sed sint illum voluptates mollitia, omnis odio praesentium?
    Quas cupiditate quaerat ad repellendus ex. Repellendus minus quod cum beatae. Modi libero doloribus earum, obcaecati numquam nihil? Incidunt officia error hic debitis optio modi alias rerum placeat, velit excepturi.
    Similique quibusdam non sit ex, omnis vel eaque magni necessitatibus sapiente doloremque fugiat, excepturi delectus dolorem beatae saepe labore ipsa id consequatur culpa libero asperiores doloribus explicabo mollitia ipsum? Adipisci!
    Reprehenderit dolore excepturi ut eaque beatae dolorum natus libero tempora tempore vitae perferendis exercitationem mollitia corrupti, corporis iste saepe necessitatibus aspernatur est maxime? Commodi repellat minima maxime dolores expedita cumque?
    Minima possimus laborum repudiandae iusto adipisci dolores, laudantium repellendus ab, ullam quisquam, sapiente deserunt molestias. Saepe, soluta. Repudiandae dolore repellat doloremque? Architecto voluptates voluptatibus eligendi molestias, ut enim nihil ducimus?
    Sed omnis numquam consectetur animi amet, nostrum placeat totam quasi illum. Nisi, cumque illum. Ipsa, consequuntur iusto inventore ratione natus, quae aspernatur, debitis nam perferendis eos voluptates numquam eum totam.
    Quasi suscipit ut, sit aspernatur quam architecto qui quos facere explicabo quae animi saepe similique sunt facilis ad accusantium magni vitae veniam at. Eaque sunt aperiam minus assumenda, recusandae odio.
    Dolor esse tempora harum explicabo architecto, iure perspiciatis corporis reprehenderit alias deserunt consectetur, asperiores exercitationem molestias, error obcaecati eum autem! Tenetur minima blanditiis exercitationem inventore delectus soluta nemo quia facilis.
    Sit quasi similique eos illum distinctio nemo ex minima quaerat pariatur? Tenetur, tempore cupiditate. Natus delectus harum dicta in consequuntur molestiae distinctio repellendus, quasi deserunt quidem quia voluptates reiciendis necessitatibus!
    Possimus numquam, ab accusantium totam dolore tempora facere architecto, nobis hic atque sequi vel pariatur id voluptates dolorum inventore perspiciatis nostrum praesentium ipsa quaerat. Error repellendus saepe quos cum dolores!
    Esse neque animi nihil ad sapiente quos debitis enim! Tempora facere incidunt, consequatur consectetur natus magni quaerat sequi, ab illo, officia quas doloribus temporibus quisquam ea ipsum corrupti. Assumenda, vel.
    Quod, atque? Maiores facilis, corporis tenetur minima non odio soluta sunt necessitatibus! Esse, possimus voluptatibus, voluptas consequatur assumenda quos explicabo molestias aliquid, quod illo iusto. Fugit, modi vel! Voluptate, aut!`
    
    return (
        <Container>
            <h1 className='text-4xl font-bold mt-10 mb-5 w-[800px]'>Публичная оферта о продаже товаров дистанционным способом</h1>
            <LegalInfo document={text} />
        </Container>
    );
}