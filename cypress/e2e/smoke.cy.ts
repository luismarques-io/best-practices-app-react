import { commentGenerator, postGenerator, userGenerator } from '../../src/test/data-generators';

describe('smoke', () => {
  it('passes', () => {
    const user = userGenerator();
    const updatedUser = userGenerator();
    const post = postGenerator();
    const updatedPost = postGenerator();
    const comment = commentGenerator();
    const updatedComment = commentGenerator();

    // Registration
    cy.visit('http://localhost:3000/register');

    cy.findByRole('textbox', { name: /username/i })
      .clear()
      .type(user.username);
    cy.findByRole('textbox', { name: /email/i }).clear().type(user.email);
    cy.findByRole('textbox', { name: /profile picture/i })
      .clear()
      .type(user.image);
    cy.findByRole('textbox', { name: /first name/i })
      .clear()
      .type(user.firstName);
    cy.findByRole('textbox', { name: /last name/i })
      .clear()
      .type(user.lastName);
    cy.get('input[type=password]:nth(0)').clear().type(user.password);
    cy.get('input[type=password]:nth(1)').clear().type(user.password);
    cy.findByRole('checkbox', { name: /terms/i }).click();

    cy.findByRole('button', { name: /submit/i }).click();

    cy.findByRole('heading', { name: `Posts`, timeout: 10000 }).should('exist');

    // Logout
    cy.findByRole('button', { name: /logout/i }).click();

    // Login with redirect to edit profile
    cy.visit('http://localhost:3000/login?redirect=/settings');

    cy.findByRole('textbox', { name: /username/i })
      .clear()
      .type(user.username);
    cy.get('input[type=password]').clear().type(user.password);
    cy.findByRole('checkbox', { name: /keep me logged-in/i }).click();

    cy.findByRole('button', { name: /submit/i }).click();

    // Edit profile
    cy.findByRole('textbox', { name: /profile picture/i })
      .clear()
      .type(updatedUser.image);
    cy.findByRole('textbox', { name: /first name/i })
      .clear()
      .type(updatedUser.firstName);
    cy.findByRole('textbox', { name: /last name/i })
      .clear()
      .type(updatedUser.lastName);
    cy.findByRole('textbox', { name: /email/i }).clear().type(updatedUser.email);
    cy.get('input[type=password]').clear().type(updatedUser.password);

    cy.findByRole('button', { name: /update settings/i }).click();

    cy.findByText(/saved/i).should('exist');
    cy.get('.navbar').within(() => {
      cy.findByText(`${updatedUser.firstName} ${updatedUser.lastName}`).should('exist');
    });

    // Create post
    cy.findByRole('link', { name: /add post/i }).click();

    cy.findByRole('textbox', { name: /title/i }).type(post.title);
    cy.findByRole('textbox', { name: /post/i }).type(post.body.substring(0, 10));
    cy.findByRole('textbox', { name: /tags/i }).type(post.tags.join(','));

    cy.findByRole('button', { name: /publish/i }).click();

    // View post
    cy.findByRole('heading', { name: post.title }).should('exist');

    // Edit post
    cy.findByRole('link', { name: 'Edit Post' }).click();

    cy.findByRole('textbox', { name: /title/i }).clear().type(updatedPost.title);
    cy.findByRole('textbox', { name: /post/i }).clear().type(updatedPost.body.substring(0, 10));
    cy.findByRole('textbox', { name: /tags/i }).clear().type(updatedPost.tags.join(','));

    cy.findByRole('button', { name: /publish/i }).click();

    // View updated post
    cy.findByRole('heading', { name: updatedPost.title }).should('exist');

    // Create comment
    cy.findByRole('textbox', { name: /write a comment/i }).type(comment.body);

    cy.findByRole('button', { name: /post comment/i }).click();

    cy.wait(200);

    // View comment
    cy.findByText(comment.body).should('exist');

    // Edit comment
    cy.get('.card').within(() => {
      cy.findByRole('button', { name: /edit/i }).click();

      cy.findAllByRole('textbox', { name: /write a comment/i })
        .clear()
        .type(updatedComment.body);

      cy.findByRole('button', { name: /save/i }).click();

      // View updated comment
      cy.findByText(updatedComment.body).should('exist');

      // Delete comment
      cy.findByText(updatedComment.body).should('exist');

      cy.findByRole('button', { name: /delete/i }).click();

      cy.wait(200);

      cy.findByText(updatedComment.body).should('not.exist');
    });

    // View post list
    cy.visit('http://localhost:3000/posts');

    cy.wait(200);

    // Search post list
    cy.findByRole('textbox', { name: /search/i }).type(updatedPost.title);
    cy.findByRole('heading', { name: updatedPost.title }).should('exist');

    cy.findByRole('textbox', { name: /search/i })
      .clear()
      .type('invalid-post-title');
    cy.findByRole('heading', { name: updatedPost.title }).should('not.exist');
    cy.findByText(/no posts found/i).should('exist');

    cy.findByRole('textbox', { name: /search/i }).clear();

    // View post list in profile
    cy.visit(`http://localhost:3000/profile`);

    cy.findByRole('heading', { name: updatedPost.title }).should('exist');

    cy.findByRole('link', { name: /continue reading/i }).click();

    // View post
    cy.findByRole('heading', { name: updatedPost.title }).should('exist');

    // Delete post
    cy.findByRole('button', { name: /delete post/i }).click();

    cy.findByText(updatedPost.title).should('not.exist');
    cy.findByText(/no posts found/i).should('exist');
  });
});
